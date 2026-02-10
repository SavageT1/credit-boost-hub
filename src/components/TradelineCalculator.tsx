import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calculator, TrendingUp, Plus, Minus, CheckCircle2, ShieldAlert, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactFormModal from "@/components/ContactFormModal";
import AnimatedSection from "@/components/AnimatedSection";

const TradelineCalculator = () => {
  const [scoreRange, setScoreRange] = useState("580-619");
  const [targetScoreRange, setTargetScoreRange] = useState("660-699");
  const [currentTradelines, setCurrentTradelines] = useState("1-2");
  const [oldestAccount, setOldestAccount] = useState("0-1");
  const [missedPayments, setMissedPayments] = useState("1-2");
  const [utilizationRange, setUtilization] = useState("50-75");
  const [negativeItems, setNegativeItems] = useState("some");

  const [tradelinesAdded, setTradelinesAdded] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);

  const scoreMids: Record<string, number> = {
    "300-499": 450,
    "500-579": 540,
    "580-619": 600,
    "620-659": 640,
    "660-699": 680,
    "700-749": 725,
    "750+": 770,
  };

  const getBaseScore = () => scoreMids[scoreRange] || 600;
  const getTargetScore = () => scoreMids[targetScoreRange] || 680;

  const estimateSingleTradelineImpact = () => {
    // Conservative, real-world-style midpoint assumptions
    let boost = 0;

    const ageBoost: Record<string, number> = {
      "0-1": 16,
      "1-2": 13,
      "3-5": 9,
      "5-10": 6,
      "10+": 3,
    };
    boost += ageBoost[oldestAccount] || 9;

    const tradelineBoost: Record<string, number> = {
      "0": 15,
      "1-2": 12,
      "3-5": 8,
      "6-10": 5,
      "10+": 2,
    };
    boost += tradelineBoost[currentTradelines] || 8;

    const utilizationBoost: Record<string, number> = {
      "0-9": 2,
      "10-29": 4,
      "30-49": 8,
      "50-75": 12,
      "76-100": 10,
    };
    boost += utilizationBoost[utilizationRange] || 6;

    const paymentPenalty: Record<string, number> = {
      "0": 3,
      "1-2": 0,
      "3-5": -10,
      "6+": -18,
    };
    boost += paymentPenalty[missedPayments] || 0;

    const negativePenalty: Record<string, number> = {
      none: 3,
      some: -3,
      severe: -14,
    };
    boost += negativePenalty[negativeItems] || 0;

    return Math.max(2, boost);
  };

  const calculateProjectedScore = (added: number) => {
    if (added === 0) return getBaseScore();

    const single = estimateSingleTradelineImpact();
    let totalBoost = single;

    // Diminishing returns (conservative)
    if (added === 2) totalBoost = Math.round(single * 1.6);
    if (added >= 3) totalBoost = Math.round(single * 2.0);

    return Math.min(850, getBaseScore() + totalBoost);
  };

  const needsRepairFirst =
    negativeItems === "severe" ||
    missedPayments === "6+" ||
    (missedPayments === "3-5" && negativeItems !== "none");

  const calculateProjectedRange = (added: number) => {
    const mid = calculateProjectedScore(added);
    const variability = needsRepairFirst ? 30 : 18;
    const low = Math.max(300, mid - variability);
    const high = Math.min(850, mid + variability);
    return { low, mid, high };
  };

  const projected = calculateProjectedRange(tradelinesAdded);
  const projectedScore = projected.mid;
  const improvement = projected.mid - getBaseScore();

  const recommendedTradelines = useMemo(() => {
    const base = getBaseScore();
    const target = getTargetScore();

    if (target <= base) return 0;

    const with1 = calculateProjectedScore(1);
    const with2 = calculateProjectedScore(2);
    const with3 = calculateProjectedScore(3);

    if (with1 >= target) return 1;
    if (with2 >= target) return 2;
    if (with3 >= target) return 3;
    return 4; // 4 means likely needs profile cleanup first / more than 3
  }, [scoreRange, targetScoreRange, currentTradelines, oldestAccount, missedPayments, utilizationRange, negativeItems]);

  const getScoreColor = (score: number) => {
    if (score >= 750) return "text-green-400";
    if (score >= 700) return "text-emerald-400";
    if (score >= 650) return "text-yellow-400";
    if (score >= 600) return "text-orange-400";
    return "text-red-400";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 750) return "Excellent";
    if (score >= 700) return "Good";
    if (score >= 650) return "Fair";
    if (score >= 600) return "Poor";
    return "Very Poor";
  };

  const handleAddTradeline = () => {
    if (tradelinesAdded < 3) {
      const newCount = tradelinesAdded + 1;
      setTradelinesAdded(newCount);
      if (newCount === 1 && !showContactModal) {
        setTimeout(() => setShowContactModal(true), 1200);
      }
    }
  };

  const removeTradeline = () => {
    if (tradelinesAdded > 0) setTradelinesAdded((prev) => prev - 1);
  };

  return (
    <>
      <section className="py-24 px-4 sm:px-8 bg-background" id="calculator">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 text-primary mb-4">
                <Calculator className="w-6 h-6" />
                <span className="text-sm font-medium tracking-wider uppercase">Free Tool</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-display text-primary text-glow mb-4">
                Credit Assessment & Tradeline Planner
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Answer a few questions to see whether you should fix credit first (Dispute Beast) and how many tradelines may help you reach your target range.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-5 gap-8">
            <AnimatedSection delay={100} className="lg:col-span-3">
              <Card className="gradient-card border-border">
                <CardHeader>
                  <CardTitle className="font-display text-primary">Your Credit Profile</CardTitle>
                  <CardDescription>Choose the closest match for each question.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-white font-medium">Current Credit Score Range</Label>
                    <RadioGroup value={scoreRange} onValueChange={setScoreRange} className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {["300-499", "500-579", "580-619", "620-659", "660-699", "700-749", "750+"].map((range) => (
                        <div key={range} className="flex items-center space-x-2">
                          <RadioGroupItem value={range} id={`score-${range}`} />
                          <Label htmlFor={`score-${range}`} className="cursor-pointer text-sm text-white">{range}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-white font-medium">Target Score Range</Label>
                    <RadioGroup value={targetScoreRange} onValueChange={setTargetScoreRange} className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {["620-659", "660-699", "700-749", "750+"].map((range) => (
                        <div key={range} className="flex items-center space-x-2">
                          <RadioGroupItem value={range} id={`target-${range}`} />
                          <Label htmlFor={`target-${range}`} className="cursor-pointer text-sm text-white">{range}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-white font-medium">How Many Credit Accounts Do You Have?</Label>
                    <RadioGroup value={currentTradelines} onValueChange={setCurrentTradelines} className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {["0", "1-2", "3-5", "6-10", "10+"].map((count) => (
                        <div key={count} className="flex items-center space-x-2">
                          <RadioGroupItem value={count} id={`tl-${count}`} />
                          <Label htmlFor={`tl-${count}`} className="cursor-pointer text-sm text-white">{count === "0" ? "None" : count}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-white font-medium">Age of Your Oldest Account</Label>
                    <RadioGroup value={oldestAccount} onValueChange={setOldestAccount} className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {[
                        { value: "0-1", label: "0-1 yr" },
                        { value: "1-2", label: "1-2 yrs" },
                        { value: "3-5", label: "3-5 yrs" },
                        { value: "5-10", label: "5-10 yrs" },
                        { value: "10+", label: "10+ yrs" },
                      ].map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={`age-${option.value}`} />
                          <Label htmlFor={`age-${option.value}`} className="cursor-pointer text-sm text-white">{option.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-white font-medium">Late or Missed Payments (Past 2 Years)</Label>
                    <RadioGroup value={missedPayments} onValueChange={setMissedPayments} className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { value: "0", label: "None" },
                        { value: "1-2", label: "1-2" },
                        { value: "3-5", label: "3-5" },
                        { value: "6+", label: "6+" },
                      ].map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={`missed-${option.value}`} />
                          <Label htmlFor={`missed-${option.value}`} className="cursor-pointer text-sm text-white">{option.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-white font-medium">Negative Items on Report (collections/charge-offs/public records)</Label>
                    <RadioGroup value={negativeItems} onValueChange={setNegativeItems} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        { value: "none", label: "None" },
                        { value: "some", label: "A few" },
                        { value: "severe", label: "Several / serious" },
                      ].map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={`neg-${option.value}`} />
                          <Label htmlFor={`neg-${option.value}`} className="cursor-pointer text-sm text-white">{option.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-white font-medium">Credit Utilization (Balances vs. Limits)</Label>
                    <RadioGroup value={utilizationRange} onValueChange={setUtilization} className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {[
                        { value: "0-9", label: "0-9%" },
                        { value: "10-29", label: "10-29%" },
                        { value: "30-49", label: "30-49%" },
                        { value: "50-75", label: "50-75%" },
                        { value: "76-100", label: "76-100%" },
                      ].map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={`util-${option.value}`} />
                          <Label htmlFor={`util-${option.value}`} className="cursor-pointer text-sm text-white">{option.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={200} className="lg:col-span-2">
              <Card className="gradient-card border-border h-fit lg:sticky lg:top-8">
                <CardHeader>
                  <CardTitle className="font-display text-primary flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Assessment Results
                  </CardTitle>
                  <CardDescription>Estimated path based on your inputs.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center py-6 rounded-lg bg-background/50 border border-border">
                    <p className="text-sm text-muted-foreground mb-1">{tradelinesAdded === 0 ? "Current Estimate" : "Projected Estimate"}</p>
                    <p className={`text-5xl font-display font-bold ${getScoreColor(projectedScore)}`}>{projected.mid}</p>
                    <p className={`text-sm font-medium mt-1 ${getScoreColor(projected.mid)}`}>{getScoreLabel(projected.mid)}</p>
                    <p className="text-xs text-muted-foreground mt-1">Estimated range: {projected.low}–{projected.high}</p>
                    <p className="text-xs text-muted-foreground mt-2">Target range: {targetScoreRange}</p>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-white font-medium text-center block">Tradelines Added: {tradelinesAdded}</Label>
                    <div className="flex gap-3 justify-center">
                      <Button variant="outline" size="icon" onClick={removeTradeline} disabled={tradelinesAdded === 0} className="h-12 w-12">
                        <Minus className="w-5 h-5" />
                      </Button>
                      <Button onClick={handleAddTradeline} disabled={tradelinesAdded >= 3} className="h-12 px-6 font-display box-glow" data-cta="add-tradeline">
                        <Plus className="w-5 h-5 mr-2" />
                        Add Tradeline
                      </Button>
                    </div>
                  </div>

                  {tradelinesAdded > 0 && (
                    <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-primary/10 border border-primary/20">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Estimated Midpoint Change</p>
                        <p className="text-xl font-display text-primary font-bold">+{improvement} pts</p>
                      </div>
                    </div>
                  )}

                  <div className="p-4 rounded-lg border border-primary/25 bg-primary/10">
                    <p className="text-sm text-primary font-semibold flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Recommended Tradelines
                    </p>
                    <p className="text-sm text-foreground mt-2">
                      {recommendedTradelines === 0 && "You may already be in your target range."}
                      {recommendedTradelines > 0 && recommendedTradelines < 4 && `Estimated needed: ${recommendedTradelines} tradeline${recommendedTradelines > 1 ? "s" : ""} to approach your target.`}
                      {recommendedTradelines === 4 && "Likely more than 3 tradelines and/or cleanup needed before reaching this target."}
                    </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Confidence: {needsRepairFirst ? "Lower" : "Moderate"} (based on self-reported ranges)
                  </p>
                  </div>

                  {needsRepairFirst && (
                    <div className="p-4 rounded-lg border border-yellow-500/30 bg-yellow-500/10">
                      <p className="text-sm font-semibold text-yellow-300 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4" />
                        Repair First Recommendation
                      </p>
                      <p className="text-sm text-foreground mt-2">
                        Your profile suggests fixing negative items first. Start with Dispute Beast, then layer tradelines for better results.
                      </p>
                      <a
                        href="https://www.disputebeast.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3"
                      >
                        <Button variant="outline" className="font-display" data-cta="dispute-beast">Visit Dispute Beast</Button>
                      </a>
                    </div>
                  )}

                  <Button onClick={() => setShowContactModal(true)} className="w-full font-display box-glow" data-cta="calculator-assessment">
                    Get My Free Custom Plan
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Estimates are scenario-based (not guarantees). Highest accuracy is typically for clean/thin files; lower when there are negatives, recent lates, or major utilization swings.
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <ContactFormModal open={showContactModal} onOpenChange={setShowContactModal} title="Get Your Free Assessment" />
    </>
  );
};

export default TradelineCalculator;
