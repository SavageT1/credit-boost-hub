import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calculator, TrendingUp, Plus, Minus, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactFormModal from "@/components/ContactFormModal";

const TradelineCalculator = () => {
  // Credit profile inputs
  const [scoreRange, setScoreRange] = useState("580-619");
  const [currentTradelines, setCurrentTradelines] = useState("1-2");
  const [oldestAccount, setOldestAccount] = useState("0-1");
  const [missedPayments, setMissedPayments] = useState("1-2");
  const [utilizationRange, setUtilization] = useState("50-75");
  
  // Calculator state
  const [tradelinesAdded, setTradelinesAdded] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);

  // Get base score from range
  const getBaseScore = () => {
    const scores: Record<string, number> = {
      "300-499": 450,
      "500-579": 540,
      "580-619": 600,
      "620-659": 640,
      "660-699": 680,
      "700-749": 725,
      "750+": 770,
    };
    return scores[scoreRange] || 600;
  };

  // Calculate projected score with tradelines
  const calculateProjectedScore = () => {
    if (tradelinesAdded === 0) return getBaseScore();
    
    let boost = 0;
    
    // Oldest account impact (younger = more benefit from aged tradeline)
    const ageBoost: Record<string, number> = {
      "0-1": 45,
      "1-2": 35,
      "3-5": 25,
      "5-10": 15,
      "10+": 10,
    };
    boost += ageBoost[oldestAccount] || 25;
    
    // Current tradelines impact (fewer = more benefit)
    const tradelineBoost: Record<string, number> = {
      "0": 50,
      "1-2": 40,
      "3-5": 30,
      "6-10": 20,
      "10+": 10,
    };
    boost += tradelineBoost[currentTradelines] || 30;
    
    // Missed payments impact (reduces potential)
    const paymentPenalty: Record<string, number> = {
      "0": 20,
      "1-2": 10,
      "3-5": 0,
      "6+": -10,
    };
    boost += paymentPenalty[missedPayments] || 0;
    
    // Utilization impact
    const utilBoost: Record<string, number> = {
      "0-9": 5,
      "10-29": 10,
      "30-49": 20,
      "50-75": 30,
      "76-100": 25,
    };
    boost += utilBoost[utilizationRange] || 20;
    
    // Apply multiplier for multiple tradelines (diminishing returns)
    if (tradelinesAdded === 2) {
      boost = Math.round(boost * 1.65);
    } else if (tradelinesAdded === 3) {
      boost = Math.round(boost * 2.1);
    }
    
    return Math.min(850, getBaseScore() + boost);
  };

  // Only show popup after user adds a tradeline (completed the calculator)
  const handleAddTradelineWithPopup = () => {
    if (tradelinesAdded < 3) {
      const newCount = tradelinesAdded + 1;
      setTradelinesAdded(newCount);
      // Show popup only after they've added their first tradeline
      if (newCount === 1 && !showContactModal) {
        setTimeout(() => setShowContactModal(true), 1500);
      }
    }
  };

  const addTradeline = () => {
    handleAddTradelineWithPopup();
  };

  const removeTradeline = () => {
    if (tradelinesAdded > 0) {
      setTradelinesAdded(prev => prev - 1);
    }
  };

  const projectedScore = calculateProjectedScore();
  const improvement = projectedScore - getBaseScore();

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

  return (
    <>
      <section className="py-24 px-4 sm:px-8 bg-background" id="calculator">
        <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <div className="flex items-center justify-center gap-2 text-primary mb-4">
              <Calculator className="w-6 h-6" />
              <span className="text-sm font-medium tracking-wider uppercase">Free Tool</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display text-primary text-glow mb-4">
              Credit Score Calculator
            </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enter your credit profile details to see how tradelines may impact your score.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-5 gap-8 animate-fade-in" style={{ animationDelay: '150ms' }}>
            {/* Input Form - Takes 3 columns */}
            <Card className="gradient-card border-border lg:col-span-3">
              <CardHeader>
                <CardTitle className="font-display text-primary">Your Credit Profile</CardTitle>
                <CardDescription>Tell us about your current credit situation.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Current Score Range */}
                <div className="space-y-3">
                  <Label className="text-white font-medium">Current Credit Score Range</Label>
                  <RadioGroup 
                    value={scoreRange} 
                    onValueChange={setScoreRange} 
                    className="grid grid-cols-2 sm:grid-cols-4 gap-2"
                  >
                    {["300-499", "500-579", "580-619", "620-659", "660-699", "700-749", "750+"].map((range) => (
                      <div key={range} className="flex items-center space-x-2">
                        <RadioGroupItem value={range} id={`score-${range}`} />
                        <Label htmlFor={`score-${range}`} className="cursor-pointer text-sm text-white">
                          {range}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Current Tradelines */}
                <div className="space-y-3">
                  <Label className="text-white font-medium">How Many Credit Accounts Do You Have?</Label>
                  <RadioGroup 
                    value={currentTradelines} 
                    onValueChange={setCurrentTradelines} 
                    className="grid grid-cols-2 sm:grid-cols-5 gap-2"
                  >
                    {["0", "1-2", "3-5", "6-10", "10+"].map((count) => (
                      <div key={count} className="flex items-center space-x-2">
                        <RadioGroupItem value={count} id={`tl-${count}`} />
                        <Label htmlFor={`tl-${count}`} className="cursor-pointer text-sm text-white">
                          {count === "0" ? "None" : count}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                {/* Oldest Account */}
                <div className="space-y-3">
                  <Label className="text-white font-medium">Age of Your Oldest Account</Label>
                  <RadioGroup 
                    value={oldestAccount} 
                    onValueChange={setOldestAccount} 
                    className="grid grid-cols-2 sm:grid-cols-5 gap-2"
                  >
                    {[
                      { value: "0-1", label: "0-1 yr" },
                      { value: "1-2", label: "1-2 yrs" },
                      { value: "3-5", label: "3-5 yrs" },
                      { value: "5-10", label: "5-10 yrs" },
                      { value: "10+", label: "10+ yrs" },
                    ].map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={`age-${option.value}`} />
                        <Label htmlFor={`age-${option.value}`} className="cursor-pointer text-sm text-white">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                {/* Missed Payments */}
                <div className="space-y-3">
                  <Label className="text-white font-medium">Late or Missed Payments (Past 2 Years)</Label>
                  <RadioGroup 
                    value={missedPayments} 
                    onValueChange={setMissedPayments} 
                    className="grid grid-cols-2 sm:grid-cols-4 gap-2"
                  >
                    {[
                      { value: "0", label: "None" },
                      { value: "1-2", label: "1-2" },
                      { value: "3-5", label: "3-5" },
                      { value: "6+", label: "6+" },
                    ].map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={`missed-${option.value}`} />
                        <Label htmlFor={`missed-${option.value}`} className="cursor-pointer text-sm text-white">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                {/* Utilization */}
                <div className="space-y-3">
                  <Label className="text-white font-medium">Credit Utilization (Balances vs. Limits)</Label>
                  <RadioGroup 
                    value={utilizationRange} 
                    onValueChange={setUtilization} 
                    className="grid grid-cols-2 sm:grid-cols-5 gap-2"
                  >
                    {[
                      { value: "0-9", label: "0-9%" },
                      { value: "10-29", label: "10-29%" },
                      { value: "30-49", label: "30-49%" },
                      { value: "50-75", label: "50-75%" },
                      { value: "76-100", label: "76-100%" },
                    ].map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={`util-${option.value}`} />
                        <Label htmlFor={`util-${option.value}`} className="cursor-pointer text-sm text-white">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
            
            {/* Results - Takes 2 columns */}
            <Card className="gradient-card border-border lg:col-span-2 h-fit lg:sticky lg:top-8">
              <CardHeader>
                <CardTitle className="font-display text-primary flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Your Results
                </CardTitle>
                <CardDescription>See how tradelines may help your profile.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Score Display */}
                <div className="text-center py-6 rounded-lg bg-background/50 border border-border">
                  <p className="text-sm text-muted-foreground mb-1">
                    {tradelinesAdded === 0 ? "Current Score" : "Projected Score"}
                  </p>
                  <p className={`text-5xl font-display font-bold ${getScoreColor(projectedScore)}`}>
                    {projectedScore}
                  </p>
                  <p className={`text-sm font-medium mt-1 ${getScoreColor(projectedScore)}`}>
                    {getScoreLabel(projectedScore)}
                  </p>
                </div>

                {/* Add/Remove Tradelines */}
                <div className="space-y-3">
                  <Label className="text-white font-medium text-center block">
                    Tradelines Added: {tradelinesAdded}
                  </Label>
                  <div className="flex gap-3 justify-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={removeTradeline}
                      disabled={tradelinesAdded === 0}
                      className="h-12 w-12"
                    >
                      <Minus className="w-5 h-5" />
                    </Button>
                    <Button
                      onClick={addTradeline}
                      disabled={tradelinesAdded >= 3}
                      className="h-12 px-6 font-display box-glow"
                      data-cta="add-tradeline"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Add Tradeline
                    </Button>
                  </div>
                </div>
                
                {/* Improvement Badge */}
                {tradelinesAdded > 0 && (
                  <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Potential Improvement</p>
                      <p className="text-xl font-display text-primary font-bold">+{improvement} Points</p>
                    </div>
                  </div>
                )}

                {/* CTA Button */}
                <Button 
                  onClick={() => setShowContactModal(true)} 
                  className="w-full font-display box-glow"
                  data-cta="calculator-assessment"
                >
                  Get Your Free Assessment
                </Button>
                
                {/* Disclaimer */}
                <p className="text-xs text-muted-foreground text-center">
                  Results are estimates only. Actual impact varies by credit profile.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <ContactFormModal 
        open={showContactModal} 
        onOpenChange={setShowContactModal}
        title="Get Your Free Assessment"
      />
    </>
  );
};

export default TradelineCalculator;
