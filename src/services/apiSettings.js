import supabase from "./supabase";

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*");

  if (error) {
    console.error("Settings error:", error);
    // Return default settings
    return {
      minBookingHours: 1,
      maxBookingHours: 8,
      maxGuestsPerBooking: 10,
      maxAdvanceBookingDays: 30,
    };
  }

  // Return first row if multiple exist, or the single row
  return (
    data?.[0] || {
      minBookingHours: 1,
      maxBookingHours: 8,
      maxGuestsPerBooking: 10,
      maxAdvanceBookingDays: 30,
    }
  );
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting) {
  // First, check if a settings record exists
  const { data: existingSettings } = await supabase
    .from("settings")
    .select("*")
    .limit(1);

  if (!existingSettings || existingSettings.length === 0) {
    // No settings exist, create a new one
    const { data, error } = await supabase
      .from("settings")
      .insert([newSetting])
      .select()
      .single();

    if (error) {
      console.error("Create settings error:", error);
      throw new Error("Settings could not be created");
    }

    return data;
  } else {
    // Update existing settings using the actual ID
    const { data, error } = await supabase
      .from("settings")
      .update(newSetting)
      .eq("id", existingSettings[0].id)
      .select()
      .single();

    if (error) {
      console.error("Update settings error:", error);
      throw new Error("Settings could not be updated");
    }

    return data;
  }
}
