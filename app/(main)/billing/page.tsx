"use client";
import React, { useState, useEffect } from "react";
import Script from "next/script";
import { useAuthContext } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Info, Youtube } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";



declare global {
  interface Window {
    Razorpay: {
      new (options: RazorpayOptions): {
        open: () => void;
        close: () => void;
      };
    };
    aiptag?: any;
    aipPlayer?: any;
  }
}


interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name?: string;
    email?: string;
  };
  theme: {
    color: string;
  };
}

interface CreditPackage {
  name: string;
  credits: number;
  price: number;
  popular?: boolean;
  features: string[];
}

const creditPackages: CreditPackage[] = [
  {
    name: "Basic Pack",
    credits: 10,
    price: 1,
    features: [
      "10 AI video generations",
      "All video styles",
      "Direct YouTube upload",
      "Valid for 30 days",
    ],
  },
  {
    name: "Creator Pack",
    credits: 100,
    price: 8,
    popular: true,
    features: [
      "25 AI video generations",
      "All video styles",
      "Direct YouTube upload",
      "Valid for 60 days",
    ],
  },
  {
    name: "Professional Pack",
    credits: 1000,
    price: 50,
    features: [
      "50 AI video generations",
      "All video styles",
      "Direct YouTube upload",
      "Valid for 90 days",
    ],
  },
  {
    name: "Business Pack",
    credits: 100000,
    price: 100,
    features: [
      "100 AI video generations",
      "All video styles",
      "Direct YouTube upload",
      "Valid for 120 days",
    ],
  },
];

const BillingPage: React.FC = () => {
  const { user } = useAuthContext();
  const [currency, setCurrency] = useState<"USD" | "INR">("INR");
  const [loadingPackage, setLoadingPackage] = useState<string | null>(null);
  const [adsWatched, setAdsWatched] = useState<number>(0);

  const updateCredits = useMutation(api.user.updateCredits);
  const exchangeRate = 86;

  useEffect(() => {
    const stored = localStorage.getItem("adsWatched");
    if (stored) setAdsWatched(parseInt(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("adsWatched", adsWatched.toString());
  }, [adsWatched]);

  const formatPrice = (priceUSD: number): string => {
    return currency === "USD"
      ? `$${priceUSD}`
      : `₹${Math.round(priceUSD * exchangeRate)}`;
  };

  const getAmountInPaise = (priceUSD: number): number =>
    Math.round(priceUSD * exchangeRate * 100);

  const handlePayment = async (pkg: CreditPackage) => {
    try {
      setLoadingPackage(pkg.name);

      const amountToCharge = getAmountInPaise(pkg.price);
      const response = await fetch("/api/create-razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amountToCharge,
          currency: "INR",
        }),
      });

      const order: RazorpayOrder = await response.json();
      if (!order.id) throw new Error("Failed to create order");

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: amountToCharge,
        currency: "INR",
        name: "AI Shorts Generator",
        description: `${pkg.name} - ${pkg.credits} credits`,
        order_id: order.id,
        handler: async (response: RazorpayResponse) => {
          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });

            const verification = await verifyRes.json();
            if (verification.success) {
              await updateCredits({
                userId: user?._id || "",
                credits: (user?.credits || 0) + pkg.credits,
              });
              toast.success(`✅ Purchased ${pkg.credits} credits!`);
            } else {
              throw new Error("Payment verification failed");
            }
          } catch (err) {
            console.error("Verification failed:", err);
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: { color: "#3B82F6" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment failed:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoadingPackage(null);
    }
  };

  const showRewardedAd = () => {
    
    window.open(
      'https://www.profitableratecpm.com/a0zzey5tf?key=a3d697c62ad52e652182a0039f5333e2',
      '_blank'
    );


     
      const checkIfClosed = setInterval(() => {
        
          clearInterval(checkIfClosed);
        
          setAdsWatched((prev) => {
            const newCount = prev + 1;
    
            if (newCount >= 10) {
              addFreeCredit();
              toast.success("🎁 You've earned 1 free credit!");
              return 0;
            } else {
              toast.success(`Watched ${newCount}/10 ads`);
              return newCount;
            }
          });
        
      }, 1000); 
    };
    

     

  const addFreeCredit = async () => {
    await updateCredits({
      userId: user?._id || "",
      credits: (user?.credits || 0) + 1,
    });
  };

  return (
    <>
      {/* Razorpay + AdInPlay */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
     
      <div className="py-5 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center gap-4 mb-6">
            <h1 className="text-4xl font-bold text-center">Buy Video Credits</h1>
            <Select value={currency} onValueChange={(v) => setCurrency(v as "USD" | "INR")}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="INR">INR (₹)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-center gap-2 mb-2">
            <Info className="h-5 w-5 text-blue-500" />
            <p className="text-gray-600">1 credit = 1 AI video generation</p>
          </div>

          <div className="flex items-center justify-center gap-2 mb-10">
            <Youtube className="h-5 w-5 text-red-500" />
            <p className="text-gray-600">All packs include YouTube upload</p>
          </div>

          {/* Free Ad Credit Section */}
          <div className="flex flex-col items-center justify-center gap-2 p-6 mb-10 border border-dashed rounded-lg">
            <p className="text-lg font-semibold">🎁 Earn Free Credit</p>
            <p className="text-gray-600 text-sm text-center">
              click 10 link ads and get{" "}
              <span className="font-bold text-green-600">1 free credit</span>
         
            </p>
            <Button onClick={showRewardedAd} className="mt-2">
              Watch Ad ({adsWatched}/ 10)
            </Button>
          </div>

         
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {creditPackages.map((pkg) => (
              <Card
                key={pkg.name}
                className={`flex flex-col hover:border-blue-500 justify-between p-6 hover:shadow-lg transition-shadow relative ${
                  pkg.popular ? "border-2 border-blue-500" : ""
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                      Most Popular
                    </span>
                  </div>
                )}
                <div>
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">{pkg.name}</h2>
                    <div className="text-3xl font-bold mb-1">
                      {formatPrice(pkg.price)}
                    </div>
                    <div>
                      <span className="text-xl font-semibold">{pkg.credits}</span>
                      <span className="text-gray-500"> credits</span>
                    </div>
                  </div>
                  <div className="space-y-3 mb-6">
                    {pkg.features.map((feature) => (
                      <div key={feature} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Button
                  onClick={() => handlePayment(pkg)}
                  disabled={loadingPackage === pkg.name}
                  className={`w-full ${pkg.popular ? "bg-blue-500 hover:bg-blue-600" : ""}`}
                  variant={pkg.popular ? "default" : "outline"}
                >
                  {loadingPackage === pkg.name
                    ? "Processing..."
                    : pkg.price === 0
                    ? "Start Free"
                    : "Buy Now"}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BillingPage;
