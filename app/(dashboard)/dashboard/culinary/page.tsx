"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format, formatDistanceToNow, differenceInHours, isToday, isBefore, startOfDay } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  TrendingUp,
  Calendar,
  Target,
  ChevronDown,
  ListChecks,
  Flame,
} from "lucide-react";

// Types
interface Task {
  id: string;
  title: string;
  description?: string;
  frequency: string;
  dueDate: string;
  completedAt?: string;
  notes?: string;
}

// Validation schema for metrics
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

// Helper functions
function getMetricStatus(value: number, target: number, isHigherBetter = true) {
  const diff = isHigherBetter ? value - target : target - value;
  if (diff >= 0) return "success";
  if (diff >= -3) return "warning";
  return "danger";
}

function getTaskUrgency(dueDate: string): "overdue" | "urgent" | "today" | "upcoming" {
  const due = new Date(dueDate);
  const now = new Date();
  const hoursUntil = differenceInHours(due, now);

  if (isBefore(due, now)) return "overdue";
  if (hoursUntil <= 4) return "urgent";
  if (isToday(due)) return "today";
  return "upcoming";
}

function getUrgencyColor(urgency: string): string {
  switch (urgency) {
    case "overdue":
      return "bg-red-100 border-red-300 text-red-900";
    case "urgent":
      return "bg-orange-100 border-orange-300 text-orange-900";
    case "today":
      return "bg-blue-100 border-blue-300 text-blue-900";
    default:
      return "bg-slate-100 border-slate-300 text-slate-900";
  }
}

export default function CulinaryDashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [todayTasks, setTodayTasks] = useState<Task[]>([]);
  const [weekTasks, setWeekTasks] = useState<Task[]>([]);
  const [scheduleTask, setScheduleTask] = useState<Task | null>(null);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(false);
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

  // Fetch tasks on load
  useEffect(() => {
    fetchTasks();
    fetchTodayMetrics();
  }, []);

  const fetchTasks = async () => {
    setIsLoadingTasks(true);
    try {
      const userId = "temp-user-id";

      // Fetch today's tasks
      const todayRes = await fetch(`/api/tasks?userId=${userId}&role=CULINARY&filter=today`);
      const todayData = await todayRes.json();
      if (todayData.success) {
        setTodayTasks(todayData.data);
      }

      // Fetch week tasks
      const weekRes = await fetch(`/api/tasks?userId=${userId}&role=CULINARY&filter=week`);
      const weekData = await weekRes.json();
      if (weekData.success) {
        setWeekTasks(weekData.data);
      }

      // Find schedule task (HOH Schedule Posting)
      const scheduleTaskData = todayData.data.find((t: Task) =>
        t.title.includes("Schedule") && t.frequency === "MON_WED"
      );
      setScheduleTask(scheduleTaskData || null);

    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoadingTasks(false);
    }
  };

  const fetchTodayMetrics = async () => {
    try {
      const userId = "temp-user-id";
      const today = format(new Date(), "yyyy-MM-dd");

      const response = await fetch(`/api/metrics?userId=${userId}&role=CULINARY&date=${today}`);
      const result = await response.json();

      if (result.success && result.data) {
        setTodayMetric(result.data);
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

  const handleTaskComplete = async (taskId: string, notes?: string) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId, notes }),
      });

      const result = await response.json();

      if (result.success) {
        // Refresh tasks
        fetchTasks();
      }
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const onSubmitMetrics = async (data: MetricFormValues) => {
    setIsLoadingMetrics(true);
    setSubmitMessage(null);

    try {
      const userId = "temp-user-id";

      const response = await fetch("/api/metrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: "CULINARY", ...data }),
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
      setIsLoadingMetrics(false);
    }
  };

  // Calculate completion stats
  const completedToday = todayTasks.filter(t => t.completedAt).length;
  const totalToday = todayTasks.length;
  const completedWeek = weekTasks.filter(t => t.completedAt).length;
  const totalWeek = weekTasks.length;
  const weekProgress = totalWeek > 0 ? (completedWeek / totalWeek) * 100 : 0;

  // Sort today's tasks by urgency
  const sortedTodayTasks = [...todayTasks].sort((a, b) => {
    const urgencyA = getTaskUrgency(a.dueDate);
    const urgencyB = getTaskUrgency(b.dueDate);
    const urgencyOrder = ["overdue", "urgent", "today", "upcoming"];
    return urgencyOrder.indexOf(urgencyA) - urgencyOrder.indexOf(urgencyB);
  });

  // Get next Monday 5pm for schedule
  const getNextMonday5pm = () => {
    const now = new Date();
    const day = now.getDay();
    const daysUntilMonday = day === 0 ? 1 : day === 1 ? 7 : 8 - day;
    const nextMonday = new Date(now);
    nextMonday.setDate(now.getDate() + daysUntilMonday);
    nextMonday.setHours(17, 0, 0, 0);
    return nextMonday;
  };

  const nextScheduleDeadline = scheduleTask ? new Date(scheduleTask.dueDate) : getNextMonday5pm();
  const hoursUntilSchedule = differenceInHours(nextScheduleDeadline, new Date());
  const scheduleStatus = hoursUntilSchedule < 0 ? "overdue" : hoursUntilSchedule < 24 ? "urgent" : "ok";

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

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        {/* TODAY'S ACTION ITEMS - PRIMARY FOCUS */}
        <Card className="border-2 border-red-500 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Flame className="h-6 w-6 text-red-600" />
                <CardTitle className="text-2xl">Today&apos;s Action Items</CardTitle>
              </div>
              {totalToday > 0 && (
                <Badge variant={completedToday === totalToday ? "success" : "warning"} className="text-lg px-3 py-1">
                  {completedToday} of {totalToday} Complete
                </Badge>
              )}
            </div>
            <CardDescription>
              {totalToday === 0 ? "Loading tasks..." : `${totalToday - completedToday} tasks remaining for today`}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {isLoadingTasks ? (
              <div className="text-center py-12 text-slate-500">
                <Clock className="h-12 w-12 mx-auto mb-3 animate-spin" />
                <p>Loading your tasks...</p>
              </div>
            ) : sortedTodayTasks.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle2 className="h-16 w-16 mx-auto mb-4 text-green-600" />
                <h3 className="text-xl font-semibold text-green-900 mb-2">✓ All caught up for today!</h3>
                <p className="text-slate-600">No outstanding tasks. Great work!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {sortedTodayTasks.map((task) => {
                  const urgency = getTaskUrgency(task.dueDate);
                  const isCompleted = !!task.completedAt;
                  const dueTime = format(new Date(task.dueDate), "h:mm a");

                  return (
                    <div
                      key={task.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isCompleted
                          ? "bg-green-50 border-green-300 opacity-70"
                          : getUrgencyColor(urgency)
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <Checkbox
                          checked={isCompleted}
                          onCheckedChange={() => !isCompleted && handleTaskComplete(task.id)}
                          className="mt-1 h-6 w-6"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <h4 className={`text-lg font-semibold ${isCompleted ? "line-through" : ""}`}>
                                {task.title}
                              </h4>
                              {task.description && (
                                <p className="text-sm mt-1 text-slate-700">{task.description}</p>
                              )}
                              {task.completedAt && (
                                <p className="text-sm mt-2 text-green-700 font-medium">
                                  ✓ Completed {formatDistanceToNow(new Date(task.completedAt), { addSuffix: true })}
                                </p>
                              )}
                            </div>
                            <div className="text-right flex-shrink-0">
                              <Badge variant="outline" className="mb-2">
                                {task.frequency}
                              </Badge>
                              {!isCompleted && (
                                <p className="text-sm font-semibold">
                                  Due: {dueTime}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* CRITICAL DEADLINE TRACKER */}
        <Card className={`border-2 shadow-md ${
          scheduleStatus === "overdue" ? "border-red-500" :
          scheduleStatus === "urgent" ? "border-orange-500" :
          "border-green-500"
        }`}>
          <CardHeader className={`border-b ${
            scheduleStatus === "overdue" ? "bg-red-50 border-red-200" :
            scheduleStatus === "urgent" ? "bg-orange-50 border-orange-200" :
            "bg-green-50 border-green-200"
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className={`h-6 w-6 ${
                  scheduleStatus === "overdue" ? "text-red-600" :
                  scheduleStatus === "urgent" ? "text-orange-600" :
                  "text-green-600"
                }`} />
                <CardTitle className="text-xl">HOH Schedule Due: Monday 5:00 PM</CardTitle>
              </div>
              {scheduleTask?.completedAt ? (
                <Badge variant="success" className="text-lg px-4 py-1">
                  ✓ Posted
                </Badge>
              ) : (
                <Badge
                  variant={scheduleStatus === "overdue" ? "danger" : scheduleStatus === "urgent" ? "warning" : "outline"}
                  className="text-lg px-4 py-1"
                >
                  {hoursUntilSchedule < 0
                    ? `${Math.abs(hoursUntilSchedule)}h OVERDUE`
                    : `${hoursUntilSchedule}h remaining`}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-700">Next Deadline:</span>
                <span className="font-semibold text-lg">
                  {format(nextScheduleDeadline, "EEEE, MMM d 'at' h:mm a")}
                </span>
              </div>
              {!scheduleTask?.completedAt && (
                <Button
                  onClick={() => scheduleTask && handleTaskComplete(scheduleTask.id, "Schedule posted")}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-6 text-lg"
                >
                  Mark Schedule Posted
                </Button>
              )}
              <div className="pt-4 border-t">
                <p className="text-sm text-slate-600 mb-2">Last 4 Weeks:</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((week) => (
                    <div key={week} className="flex-1 h-12 bg-green-100 rounded flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-green-700 font-semibold mt-2">100% on-time (4/4)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* THIS WEEK OVERVIEW */}
        <Card className="border-slate-200 shadow-md">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ListChecks className="h-6 w-6 text-blue-600" />
                <CardTitle className="text-xl">This Week Overview</CardTitle>
              </div>
              <Badge variant="outline" className="text-lg px-3 py-1">
                {completedWeek} / {totalWeek} Complete
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">Progress</span>
                  <span className="text-sm font-semibold">{Math.round(weekProgress)}%</span>
                </div>
                <Progress value={weekProgress} className="h-3" />
              </div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="week-tasks">
                  <AccordionTrigger className="text-base font-semibold">
                    View All Week Tasks ({weekTasks.length})
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-2">
                      {weekTasks.map((task) => (
                        <div key={task.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                          <Checkbox
                            checked={!!task.completedAt}
                            onCheckedChange={() => !task.completedAt && handleTaskComplete(task.id)}
                          />
                          <div className="flex-1">
                            <p className={`font-medium ${task.completedAt ? "line-through text-slate-500" : ""}`}>
                              {task.title}
                            </p>
                            <p className="text-sm text-slate-600">
                              Due: {format(new Date(task.dueDate), "EEE, MMM d")}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {task.frequency}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </CardContent>
        </Card>

        {/* QUICK METRIC ENTRY - COLLAPSED AT BOTTOM */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="metrics" className="border rounded-lg bg-white shadow-md">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex items-center justify-between w-full pr-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-slate-600" />
                  <span className="text-lg font-semibold">Enter Today&apos;s Metrics</span>
                </div>
                {todayMetric && (
                  <Badge variant="success" className="mr-2">
                    ✓ Entered {format(new Date(todayMetric.updatedAt), "h:mm a")}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <CardContent className="pt-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmitMetrics)} className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      {/* Food Great @ 72 */}
                      <FormField
                        control={form.control}
                        name="foodGreat72"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Food Great @ 72 (%)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.01"
                                min="0"
                                max="100"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
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
                            <FormLabel>Safe Score (%)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.01"
                                min="0"
                                max="100"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
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
                            <FormLabel>Spec/Sold 100% (%)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.01"
                                min="0"
                                max="100"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
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
                            <FormLabel>TM&apos;s &gt;72 Hours</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormDescription>Target: 0</FormDescription>
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
                            <FormLabel>Pull Thaw (%)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.01"
                                min="0"
                                max="100"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormDescription>Target: 95%+</FormDescription>
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
                              placeholder="Any additional notes..."
                              rows={3}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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

                    <Button
                      type="submit"
                      disabled={isLoadingMetrics}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-6 text-lg"
                    >
                      {isLoadingMetrics ? "Saving..." : "Save Metrics"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </div>
  );
}
