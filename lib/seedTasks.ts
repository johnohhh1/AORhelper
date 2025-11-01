// Seed tasks for Culinary Leader based on Leader_Responsibilities_Master_List.md

export interface TaskTemplate {
  title: string;
  description?: string;
  frequency: "DAILY" | "WEEKLY" | "MON_WED" | "EOP" | "MONTHLY" | "QUARTERLY" | "YEARLY" | "CUSTOM";
  role: "CULINARY" | "HOSPITALITY" | "TOGO_BAR";
  dueTime?: string; // HH:mm format
}

export const CULINARY_TASKS: TaskTemplate[] = [
  // DAILY TASKS
  {
    title: "Validate Pull Thaw is done by 12pm",
    description: "Validate KitchenSync: prepped in order, Pull Thaw completed by noon",
    frequency: "DAILY",
    role: "CULINARY",
    dueTime: "12:00",
  },

  // WEEKLY TASKS (Mon-Wed for schedules, others on Monday)
  {
    title: "HOH Schedule Posting",
    description: "Post Back of House schedule by Monday 5:00 PM",
    frequency: "MON_WED",
    role: "CULINARY",
    dueTime: "17:00",
  },
  {
    title: "AvT: Action Plan",
    description: "Complete At the Table Action Plan for the period",
    frequency: "MONTHLY",
    role: "CULINARY",
    dueTime: "16:00",
  },
  {
    title: "AvT: Board Picture",
    description: "Take and upload At the Table Board picture",
    frequency: "WEEKLY",
    role: "CULINARY",
  },
  {
    title: "Food Great @ 72 Review",
    description: "Review Food Great @ 72 metric and analyze trends",
    frequency: "WEEKLY",
    role: "CULINARY",
  },
  {
    title: "TM's >72 Hours Check",
    description: "Review and address team members over 72 hours (PT)",
    frequency: "WEEKLY",
    role: "CULINARY",
  },
  {
    title: "HOH Training @ 90%",
    description: "Ensure Back of House training is at 90% or above",
    frequency: "WEEKLY",
    role: "CULINARY",
  },
  {
    title: "HOH VAT @ 90%",
    description: "Ensure Back of House VAT certification at 90% or above",
    frequency: "WEEKLY",
    role: "CULINARY",
  },
  {
    title: "HOH VFD @ 90%",
    description: "Ensure Back of House VFD certification at 90% or above",
    frequency: "WEEKLY",
    role: "CULINARY",
  },
  {
    title: "HOH TM Meal Inspect",
    description: "Inspect and validate team member meal preparation",
    frequency: "WEEKLY",
    role: "CULINARY",
  },
  {
    title: "HOH BSB/LINC By Whens",
    description: "Review Back of House Bigger, Smaller, Better and LINC by-when items",
    frequency: "WEEKLY",
    role: "CULINARY",
  },

  // END OF PERIOD TASKS
  {
    title: "HOH Job Ads Review",
    description: "Review and update Back of House job advertisements",
    frequency: "EOP",
    role: "CULINARY",
  },
  {
    title: "AvT: Inventory",
    description: "Complete At the Table inventory for End of Period",
    frequency: "EOP",
    role: "CULINARY",
  },

  // MONTHLY TASKS (First day of period)
  {
    title: "HOH Connection Board Update",
    description: "Update Back of House Connection Board for the new period",
    frequency: "MONTHLY",
    role: "CULINARY",
    dueTime: "16:00",
  },
  {
    title: "Marketing Guide Validation",
    description: "Validate marketing guide compliance for Culinary",
    frequency: "MONTHLY",
    role: "CULINARY",
  },
  {
    title: "Steritech Self Audit",
    description: "Complete Steritech self-audit for kitchen",
    frequency: "MONTHLY",
    role: "CULINARY",
  },

  // QUARTERLY TASKS
  {
    title: "Validate GSE",
    description: "Validate Guest Service Excellence standards",
    frequency: "QUARTERLY",
    role: "CULINARY",
  },
  {
    title: "Trainer Meeting",
    description: "Attend quarterly trainer meeting",
    frequency: "QUARTERLY",
    role: "CULINARY",
  },
  {
    title: "Big Swing Rollouts",
    description: "Execute quarterly Big Swing initiatives rollout",
    frequency: "QUARTERLY",
    role: "CULINARY",
  },
];

// Helper function to get next due date based on frequency
export function getNextDueDate(
  frequency: TaskTemplate["frequency"],
  fromDate: Date = new Date(),
  dueTime?: string
): Date {
  const date = new Date(fromDate);
  date.setHours(0, 0, 0, 0);

  switch (frequency) {
    case "DAILY":
      // Due today
      break;

    case "WEEKLY":
      // Due next Monday
      const daysUntilMonday = (8 - date.getDay()) % 7 || 7;
      date.setDate(date.getDate() + daysUntilMonday);
      break;

    case "MON_WED":
      // Schedule tasks: Due next Monday
      const daysToMonday = (8 - date.getDay()) % 7 || 7;
      date.setDate(date.getDate() + daysToMonday);
      break;

    case "EOP":
      // End of Period (assume end of month for now)
      date.setMonth(date.getMonth() + 1, 0); // Last day of current month
      break;

    case "MONTHLY":
      // Due 1st of next month
      date.setMonth(date.getMonth() + 1, 1);
      break;

    case "QUARTERLY":
      // Due in 3 months
      date.setMonth(date.getMonth() + 3, 1);
      break;

    case "YEARLY":
      // Due in 1 year
      date.setFullYear(date.getFullYear() + 1, 0, 1);
      break;

    default:
      break;
  }

  // Set time if provided
  if (dueTime) {
    const [hours, minutes] = dueTime.split(":").map(Number);
    date.setHours(hours, minutes, 0, 0);
  } else {
    // Default to end of day
    date.setHours(23, 59, 59, 999);
  }

  return date;
}

// Generate tasks for the next 30 days
export function generateCulinaryTasks(userId: string) {
  const tasks = [];
  const today = new Date();

  for (const template of CULINARY_TASKS) {
    // Generate multiple instances for daily/weekly tasks
    if (template.frequency === "DAILY") {
      // Generate for next 7 days
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        const dueDate = getNextDueDate(template.frequency, date, template.dueTime);

        tasks.push({
          userId,
          role: template.role,
          title: template.title,
          description: template.description,
          frequency: template.frequency,
          dueDate,
        });
      }
    } else if (template.frequency === "WEEKLY" || template.frequency === "MON_WED") {
      // Generate for next 4 weeks
      for (let i = 0; i < 4; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + (i * 7));
        const dueDate = getNextDueDate(template.frequency, date, template.dueTime);

        tasks.push({
          userId,
          role: template.role,
          title: template.title,
          description: template.description,
          frequency: template.frequency,
          dueDate,
        });
      }
    } else {
      // For monthly, quarterly, etc., generate just one instance
      const dueDate = getNextDueDate(template.frequency, today, template.dueTime);

      tasks.push({
        userId,
        role: template.role,
        title: template.title,
        description: template.description,
        frequency: template.frequency,
        dueDate,
      });
    }
  }

  return tasks;
}
