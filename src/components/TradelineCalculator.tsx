import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calculator, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";

const TradelineCalculator = () => {
  const [currentScore, setCurrentScore] = useState(620);
  const [creditAge, setCreditAge] = useState("1-2");
  const [totalAccounts, setTotalAccounts] = useState(3);
  const [utilization, setUtilization] = useState(65);
  const [negativeItems, setNegativeItems] = useState("1-2");
  const [projectedScore, setProjectedScore] = useState(0);

  useEffect(() => {
    calculateProjectedScore();
  }, [currentScore, creditAge, totalAccounts, utilization, negativeItems]);

  const calculateProjectedScore = () => {
    let boost = 0;
    
    // Credit age impact (adding aged tradeline helps thin files most)
    if (creditAge === "0-1") boost += 45;
    else if (creditAge === "1-2") boost += 35;
    else if (creditAge === "3-5") boost += 25;
    else boost += 15;
    
    // Account mix impact (fewer accounts = bigger impact)
    if (totalAccounts <= 2) boost += 40;
    else if (totalAccounts <= 4) boost += 30;
    else if (totalAccounts <= 6) boost += 20;
    else boost += 10;
    
    // Utilization impact
    if (utilization > 50) boost += 25;
    else if (utilization > 30) boost += 15;
    else boost += 5;
    
    // Negative items reduce potential
    if (negativeItems === "0") boost += 20;
    else if (negativeItems === "1-2") boost += 10;
    else if (negativeItems === "3-4") boost -= 5;
    else boost -= 15;
    
    // Cap the score at 850
    const newScore = Math.min(850, currentScore + boost);
    setProjectedScore(newScore);
  };

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

  const improvement = projectedScore - currentScore;

  return (
    <section className="py-24 px-8 bg-background" id="calculator">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-primary mb-4">
            <Calculator className="w-6 h-6" />
            <span className="text-sm font-medium tracking-wider uppercase">Free Tool</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display text-primary text-glow mb-4">
            Tradeline Calculator
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get an estimate of how a premium tradeline could impact your credit score.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="gradient-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-primary flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Your Current Profile
              </CardTitle>
              <CardDescription>Enter your credit details for a personalized estimate.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Current Score */}
              <div className="space-y-3">
                <Label className="text-foreground">Current Credit Score: {currentScore}</Label>
                <Slider
                  value={[currentScore]}
                  onValueChange={(value) => setCurrentScore(value[0])}
                  min={300}
                  max={750}
                  step={10}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>300</span>
                  <span>750</span>
                </div>
              </div>
              
              {/* Credit Age */}
              <div className="space-y-3">
                <Label className="text-foreground">Average Age of Credit History</Label>
                <RadioGroup value={creditAge} onValueChange={setCreditAge} className="grid grid-cols-2 gap-2">
                  {[
                    { value: "0-1", label: "0-1 years" },
                    { value: "1-2", label: "1-2 years" },
                    { value: "3-5", label: "3-5 years" },
                    { value: "5+", label: "5+ years" },
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`age-${option.value}`} />
                      <Label htmlFor={`age-${option.value}`} className="cursor-pointer text-sm text-foreground">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              {/* Total Accounts */}
              <div className="space-y-3">
                <Label className="text-foreground">Total Credit Accounts: {totalAccounts}</Label>
                <Slider
                  value={[totalAccounts]}
                  onValueChange={(value) => setTotalAccounts(value[0])}
                  min={0}
                  max={15}
                  step={1}
                  className="py-2"
                />
              </div>
              
              {/* Utilization */}
              <div className="space-y-3">
                <Label className="text-foreground">Credit Utilization: {utilization}%</Label>
                <Slider
                  value={[utilization]}
                  onValueChange={(value) => setUtilization(value[0])}
                  min={0}
                  max={100}
                  step={5}
                  className="py-2"
                />
                <p className="text-xs text-muted-foreground">
                  {utilization <= 30 ? "✓ Good - Under 30%" : utilization <= 50 ? "⚠ Fair - Consider lowering" : "⚠ High - Impacts score negatively"}
                </p>
              </div>
              
              {/* Negative Items */}
              <div className="space-y-3">
                <Label className="text-foreground">Negative Items (Late Payments, Collections)</Label>
                <RadioGroup value={negativeItems} onValueChange={setNegativeItems} className="grid grid-cols-2 gap-2">
                  {[
                    { value: "0", label: "None" },
                    { value: "1-2", label: "1-2 items" },
                    { value: "3-4", label: "3-4 items" },
                    { value: "5+", label: "5+ items" },
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`neg-${option.value}`} />
                      <Label htmlFor={`neg-${option.value}`} className="cursor-pointer text-sm text-foreground">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
          
          {/* Results */}
          <Card className="gradient-card border-border h-fit sticky top-8">
            <CardHeader>
              <CardTitle className="font-display text-primary flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Projected Results
              </CardTitle>
              <CardDescription>Estimated impact with a premium tradeline.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Score Display */}
              <div className="text-center py-8 rounded-lg bg-background/50 border border-border">
                <p className="text-sm text-muted-foreground mb-2">Projected Score</p>
                <p className={`text-6xl font-display font-bold ${getScoreColor(projectedScore)}`}>
                  {projectedScore}
                </p>
                <p className={`text-lg font-medium mt-2 ${getScoreColor(projectedScore)}`}>
                  {getScoreLabel(projectedScore)}
                </p>
              </div>
              
              {/* Improvement Badge */}
              <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-primary/10 border border-primary/20">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Potential Improvement</p>
                  <p className="text-2xl font-display text-primary font-bold">+{improvement} Points</p>
                </div>
              </div>
              
              {/* Disclaimer */}
              <div className="text-xs text-muted-foreground p-4 rounded bg-background/50 border border-border">
                <p className="font-medium mb-1">Disclaimer:</p>
                <p>This calculator provides an estimate only. Actual results may vary based on individual credit profiles and bureau reporting. Contact us for a personalized consultation.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TradelineCalculator;
