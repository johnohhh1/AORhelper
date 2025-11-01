"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CheckCircle2, AlertCircle, Clock, TrendingUp } from "lucide-react";

// Validation schema
const metricFormSchema = z.object({
  foodGreat72: z.number().min(0).max(100),
  safeScore: z.number().min(0).max(100),
  specSold100: z.number().min(0).max(100),
  tmsAbove72: z.number().int().min(0),
  pullThaw: z.number().min(0).max(100),
  notes: z.string().optional(),
  date: z.string(),
});

type MetricFormValues = z.infer<typeof metricFormSchema>;

// Helper function to get metric status
function getMetricStatus(value: number, target: number, isHigherBetter = true) {
  const diff = isHigherBetter ? value - target : target - value;
  if (diff >= 0) return "success";
  if (diff >= -3) return "warning";
  return "danger";
}

export default function CulinaryDashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [todayMetric, setTodayMetric] = useState<any>(null);

  const form = useForm<MetricFormValues>({
    resolver: zodResolver(metricFormSchema),
    defaultValues: {
      foodGreat72: 0,
      safeScore: 0,
      specSold100: 0,
      tmsAbove72: 0,
      pullThaw: 0,
      notes: "",
      date: format(new Date(), "yyyy-MM-dd"),
    },
  });

  // Fetch today's metrics on load
  useEffect(() => {
    fetchTodayMetrics();
  }, []);

  const fetchTodayMetrics = async () => {
    try {
      // TODO: Replace with actual user ID from auth context
      const userId = "temp-user-id";
      const today = format(new Date(), "yyyy-MM-dd");

      const response = await fetch(`/api/metrics?userId=${userId}&role=CULINARY&date=${today}`);
      const result = await response.json();

      if (result.success && result.data) {
        setTodayMetric(result.data);
        // Populate form with existing data
        form.reset({
          foodGreat72: result.data.foodGreat72 || 0,
          safeScore: result.data.safeScore || 0,
          specSold100: result.data.specSold100 || 0,
          tmsAbove72: result.data.tmsAbove72 || 0,
          pullThaw: result.data.pullThaw || 0,
          notes: result.data.notes || "",
          date: format(new Date(result.data.date), "yyyy-MM-dd"),
        });
      }
    } catch (error) {
      console.error("Error fetching metrics:", error);
    }
  };

  const onSubmit = async (data: MetricFormValues) => {
    setIsLoading(true);
    setSubmitMessage(null);

    try {
      // TODO: Replace with actual user ID from auth context
      const userId = "temp-user-id";

      const response = await fetch("/api/metrics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          role: "CULINARY",
          ...data,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitMessage({ type: "success", text: result.message });
        setTodayMetric(result.data);
        setTimeout(() => setSubmitMessage(null), 5000);
      } else {
        setSubmitMessage({ type: "error", text: result.message || "Failed to save metrics" });
      }
    } catch (error) {
      console.error("Error submitting metrics:", error);
      setSubmitMessage({ type: "error", text: "An error occurred while saving metrics" });
    } finally {
      setIsLoading(false);
    }
  };

  const watchedValues = form.watch();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Welcome, Tiffany Larkins
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                {format(new Date(), "EEEE, MMMM d, yyyy")}
              </p>
            </div>
            <Badge variant="default" className="w-fit bg-red-600 hover:bg-red-700 text-lg px-4 py-2">
              Culinary Leader
            </Badge>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Priorities & Snapshot */}
          <div className="space-y-6 lg:col-span-1">
            {/* Today's Priorities Card */}
            <Card className="border-slate-200 shadow-md">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Today&apos;s Priorities
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">Enter Daily Metrics</p>
                      <p className="text-sm text-slate-600">Complete by end of shift</p>
                    </div>
                    <Badge variant={todayMetric ? "success" : "warning"}>
                      {todayMetric ? "Done" : "Pending"}
                    </Badge>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">Pull & Thaw Check</p>
                      <p className="text-sm text-slate-600">By 12:00 PM</p>
                    </div>
                    <Badge variant="outline">Daily</Badge>
                  </div>

                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">BOH Schedule Due</p>
                      <p className="text-sm text-slate-600">Monday 5:00 PM</p>
                    </div>
                    <Badge variant="outline">Weekly</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Metric Snapshot Card */}
            {todayMetric && (
              <Card className="border-slate-200 shadow-md">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-slate-200">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Today&apos;s Metrics
                  </CardTitle>
                  <CardDescription>
                    Last updated: {format(new Date(todayMetric.updatedAt), "h:mm a")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <MetricDisplay
                      label="Food Great @ 72"
                      value={todayMetric.foodGreat72}
                      target={95}
                      unit="%"
                    />
                    <MetricDisplay
                      label="Safe Score"
                      value={todayMetric.safeScore}
                      target={93}
                      unit="%"
                    />
                    <MetricDisplay
                      label="Spec/Sold 100%"
                      value={todayMetric.specSold100}
                      target={99}
                      unit="%"
                    />
                    <MetricDisplay
                      label="TM's >72 Hours"
                      value={todayMetric.tmsAbove72}
                      target={0}
                      unit=""
                      isHigherBetter={false}
                    />
                    <MetricDisplay
                      label="Pull Thaw"
                      value={todayMetric.pullThaw}
                      target={95}
                      unit="%"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Metric Entry Form */}
          <div className="lg:col-span-2">
            <Card className="border-slate-200 shadow-md">
              <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-slate-200">
                <CardTitle className="text-2xl">Daily Metric Entry</CardTitle>
                <CardDescription>
                  Enter your culinary metrics for {format(new Date(), "MMMM d, yyyy")}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Date Picker */}
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Metrics Grid */}
                    <div className="grid gap-6 md:grid-cols-2">
                      {/* Food Great @ 72 */}
                      <FormField
                        control={form.control}
                        name="foodGreat72"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center justify-between">
                              <span>Food Great @ 72</span>
                              <MetricBadge value={Number(field.value)} target={95} />
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type="number"
                                  step="0.01"
                                  min="0"
                                  max="100"
                                  placeholder="95.00"
                                  {...field}
                                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                  className={getInputClassName(Number(field.value), 95)}
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                                  %
                                </span>
                              </div>
                            </FormControl>
                            <FormDescription>Target: 95%+</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Safe Score */}
                      <FormField
                        control={form.control}
                        name="safeScore"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center justify-between">
                              <span>Safe Score</span>
                              <MetricBadge value={Number(field.value)} target={93} />
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type="number"
                                  step="0.01"
                                  min="0"
                                  max="100"
                                  placeholder="93.00"
                                  {...field}
                                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                  className={getInputClassName(Number(field.value), 93)}
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                                  %
                                </span>
                              </div>
                            </FormControl>
                            <FormDescription>Target: 93%+</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Spec/Sold 100% */}
                      <FormField
                        control={form.control}
                        name="specSold100"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center justify-between">
                              <span>Spec/Sold 100%</span>
                              <MetricBadge value={Number(field.value)} target={99} />
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type="number"
                                  step="0.01"
                                  min="0"
                                  max="100"
                                  placeholder="99.00"
                                  {...field}
                                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                  className={getInputClassName(Number(field.value), 99)}
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                                  %
                                </span>
                              </div>
                            </FormControl>
                            <FormDescription>Target: 99%+</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* TM's >72 Hours */}
                      <FormField
                        control={form.control}
                        name="tmsAbove72"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center justify-between">
                              <span>TM&apos;s &gt;72 Hours</span>
                              <MetricBadge
                                value={Number(field.value)}
                                target={0}
                                isHigherBetter={false}
                              />
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                placeholder="0"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                className={getInputClassName(Number(field.value), 0, false)}
                              />
                            </FormControl>
                            <FormDescription>Target: 0 team members</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Pull Thaw */}
                      <FormField
                        control={form.control}
                        name="pullThaw"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel className="flex items-center justify-between">
                              <span>Pull Thaw by 12pm</span>
                              <MetricBadge value={Number(field.value)} target={95} />
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type="number"
                                  step="0.01"
                                  min="0"
                                  max="100"
                                  placeholder="95.00"
                                  {...field}
                                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                  className={getInputClassName(Number(field.value), 95)}
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                                  %
                                </span>
                              </div>
                            </FormControl>
                            <FormDescription>Target: 95%+ completion rate</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Notes */}
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notes (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Add any additional notes or observations..."
                              className="resize-none"
                              rows={4}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Max 500 characters - Include any issues or highlights from today
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Submit Message */}
                    {submitMessage && (
                      <div
                        className={`rounded-lg p-4 ${
                          submitMessage.type === "success"
                            ? "bg-green-50 text-green-800 border border-green-200"
                            : "bg-red-50 text-red-800 border border-red-200"
                        }`}
                      >
                        <p className="font-medium">{submitMessage.text}</p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex gap-4">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-6 text-lg"
                      >
                        {isLoading ? "Saving..." : "Save Metrics"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => form.reset()}
                        disabled={isLoading}
                        className="px-8 py-6"
                      >
                        Clear
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

// Helper Components
function MetricBadge({
  value,
  target,
  isHigherBetter = true,
}: {
  value: number;
  target: number;
  isHigherBetter?: boolean;
}) {
  if (!value || value === 0) return null;

  const status = getMetricStatus(value, target, isHigherBetter);
  const variant = status === "success" ? "success" : status === "warning" ? "warning" : "danger";

  return (
    <Badge variant={variant} className="text-xs">
      {status === "success" ? "On Target" : status === "warning" ? "Close" : "Below Target"}
    </Badge>
  );
}

function MetricDisplay({
  label,
  value,
  target,
  unit,
  isHigherBetter = true,
}: {
  label: string;
  value: number;
  target: number;
  unit: string;
  isHigherBetter?: boolean;
}) {
  const status = getMetricStatus(value, target, isHigherBetter);
  const bgColor =
    status === "success"
      ? "bg-green-100 text-green-800"
      : status === "warning"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-red-100 text-red-800";

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <span className={`text-sm font-bold px-3 py-1 rounded-full ${bgColor}`}>
        {value}
        {unit}
      </span>
    </div>
  );
}

function getInputClassName(value: number, target: number, isHigherBetter = true) {
  if (!value || value === 0) return "";

  const status = getMetricStatus(value, target, isHigherBetter);

  if (status === "success") {
    return "border-green-500 focus-visible:ring-green-500";
  } else if (status === "warning") {
    return "border-yellow-500 focus-visible:ring-yellow-500";
  } else {
    return "border-red-500 focus-visible:ring-red-500";
  }
}
