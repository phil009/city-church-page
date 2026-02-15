// app/join/page.tsx
"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface FormData {
    "Full Name": string;
    "Phone Number": string;
    "Email Address": string;
    Gender: string;
    "Age Range": string;
    "Church Membership Duration": string;
    "Activities You Enjoy": string;
    "Previous Service Experience": string;
}

interface ServiceGroup {
    groupField: string;
    options: string[];
}

type ServiceGroupMapping = {
    [key: string]: ServiceGroup;
};

export default function JoinUnitForm() {
    const [formData, setFormData] = useState<FormData>({
        "Full Name": "",
        "Phone Number": "",
        "Email Address": "",
        Gender: "",
        "Age Range": "",
        "Church Membership Duration": "",
        "Activities You Enjoy": "",
        "Previous Service Experience": "",
    });

    const [selectedUnits, setSelectedUnits] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    // Service unit mapping based on activities
    const serviceGroupMapping: ServiceGroupMapping = {
        "Praying for people": {
            groupField: "Service Group 2",
            options: [
                "Maturity Team",
                "On-site Prayer Service",
                "Online Prayer Unit (HOT)",
            ],
        },
        "Welcoming and helping people feel comfortable": {
            groupField: "Service Group 3",
            options: [
                "Guest Services",
                "Protocol Unit",
                "Guest Connect Service",
                "First Impression",
            ],
        },
        "Teaching or mentoring others": {
            groupField: "Service Group 4",
            options: ["Next GEN", "KidsROCK", "Word Recipe"],
        },
        "Creative expression (music, drama, dance, art)": {
            groupField: "Service Group 1",
            options: ["Sweet Incense", "Creative Arts Department"],
        },
        "Technical or media-related work": {
            groupField: "Service Group 6",
            options: ["Production"],
        },
        "Management, and Administration": {
            groupField: "Service Group 5",
            options: [
                "Ministry Team",
                "Ministry Development Center",
                "Pathway Monitors",
                "Ministry Match",
            ],
        },
        "Caring for people in need": {
            groupField: "Service Group 7",
            options: ["i-CARE", "Hope Bearers", "Stewards"],
        },
    };

    const handleInputChange = (name: keyof FormData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Reset selected units when activity changes
        if (name === "Activities You Enjoy") {
            setSelectedUnits([]);
        }
    };

    const handleUnitSelection = (unit: string) => {
        setSelectedUnits((prev) => {
            if (prev.includes(unit)) {
                return prev.filter((u) => u !== unit);
            } else {
                return [...prev, unit];
            }
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const activity = formData["Activities You Enjoy"];
            const serviceGroup = serviceGroupMapping[activity];

            const submissionData: Record<string, string | string[]> = {
                "Full Name": formData["Full Name"],
                "Phone Number": formData["Phone Number"],
                "Email Address": formData["Email Address"],
                Gender: formData["Gender"],
                "Age Range": formData["Age Range"],
                "Church Membership Duration":
                    formData["Church Membership Duration"],
                "Activities You Enjoy": activity,
                "Previous Service Experience":
                    formData["Previous Service Experience"],
            };

            if (serviceGroup && selectedUnits.length > 0) {
                submissionData[serviceGroup.groupField] = selectedUnits;
            }

            const response = await fetch("/api/join-unit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(submissionData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(
                    "Your submission has been received. We'll be in touch soon.",
                );

                // Reset form
                setFormData({
                    "Full Name": "",
                    "Phone Number": "",
                    "Email Address": "",
                    Gender: "",
                    "Age Range": "",
                    "Church Membership Duration": "",
                    "Activities You Enjoy": "",
                    "Previous Service Experience": "",
                });
                setSelectedUnits([]);
            } else {
                toast.error(
                    data.error || "Something went wrong. Please try again.",
                );
                console.error("Submission error:", data.error);
            }
        } catch (error) {
            toast.error(
                "Failed to submit form. Please check your connection and try again.",
            );
            console.error("Form error:", error);
        } finally {
            setLoading(false);
        }
    };

    const currentActivity = formData["Activities You Enjoy"];
    const availableUnits = currentActivity
        ? serviceGroupMapping[currentActivity]?.options || []
        : [];

    return (
        <div className="min-h-screen px-4 sm:px-12 md:px-20 py-8 md:py-14">
            <div className="max-w-2xl bg-appDark/70 backdrop-blur-sm text-white border border-gray-200/40 rounded-2xl p-6">
                <div className="mb-8">
                    <h1 className="text-xl md:text-3xl font-bold text-white mb-2">
                        Join a Service Unit
                    </h1>
                    <p className="text-appGhost/60">
                        Let&apos;s find the perfect place for you.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-8"
                >
                    {/* Personal Information Section */}
                    <div className="space-y-4">
                        <h2 className="text-lg md:text-xl font-semibold text-white mb-4">
                            Personal Information
                        </h2>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">
                                    Full Name{" "}
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="fullName"
                                    type="text"
                                    value={formData["Full Name"]}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "Full Name",
                                            e.target.value,
                                        )
                                    }
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phoneNumber">
                                    Phone Number
                                </Label>
                                <Input
                                    id="phoneNumber"
                                    type="tel"
                                    value={formData["Phone Number"]}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "Phone Number",
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="emailAddress">
                                    Email Address
                                </Label>
                                <Input
                                    id="emailAddress"
                                    type="email"
                                    value={formData["Email Address"]}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "Email Address",
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="gender">
                                    Gender{" "}
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    value={formData["Gender"]}
                                    onValueChange={(value) =>
                                        handleInputChange("Gender", value)
                                    }
                                    required
                                >
                                    <SelectTrigger id="gender">
                                        <SelectValue placeholder="Select..." />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        <SelectItem value="Male">
                                            Male
                                        </SelectItem>
                                        <SelectItem value="Female">
                                            Female
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="ageRange">Age Range</Label>
                                <Select
                                    value={formData["Age Range"]}
                                    onValueChange={(value) =>
                                        handleInputChange("Age Range", value)
                                    }
                                >
                                    <SelectTrigger id="ageRange">
                                        <SelectValue placeholder="Select..." />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        <SelectItem value="13–17">
                                            13–17
                                        </SelectItem>
                                        <SelectItem value="18–25">
                                            18–25
                                        </SelectItem>
                                        <SelectItem value="26–35">
                                            26–35
                                        </SelectItem>
                                        <SelectItem value="36–45">
                                            36–45
                                        </SelectItem>
                                        <SelectItem value="46+">46+</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="membershipDuration">
                                    How long have you been with us?
                                </Label>
                                <Select
                                    value={
                                        formData["Church Membership Duration"]
                                    }
                                    onValueChange={(value) =>
                                        handleInputChange(
                                            "Church Membership Duration",
                                            value,
                                        )
                                    }
                                >
                                    <SelectTrigger id="membershipDuration">
                                        <SelectValue placeholder="Select..." />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        <SelectItem value="New member">
                                            New member
                                        </SelectItem>
                                        <SelectItem value="< 6 months">
                                            &lt; 6 months
                                        </SelectItem>
                                        <SelectItem value="6–12 months">
                                            6–12 months
                                        </SelectItem>
                                        <SelectItem value="1–3 years">
                                            1–3 years
                                        </SelectItem>
                                        <SelectItem value="3+ years">
                                            3+ years
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Service Interest Section */}
                    <div className="space-y-4">
                        <h2 className="text-lg md:text-xl font-semibold text-white mb-4">
                            Service Interest
                        </h2>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="activities">
                                    Activities You Enjoy{" "}
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    value={formData["Activities You Enjoy"]}
                                    onValueChange={(value) =>
                                        handleInputChange(
                                            "Activities You Enjoy",
                                            value,
                                        )
                                    }
                                    required
                                >
                                    <SelectTrigger id="activities">
                                        <SelectValue placeholder="Select..." />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        <SelectItem value="Praying for people">
                                            Praying for people
                                        </SelectItem>
                                        <SelectItem value="Welcoming and helping people feel comfortable">
                                            Welcoming and helping people feel
                                            comfortable
                                        </SelectItem>
                                        <SelectItem value="Teaching or mentoring others">
                                            Teaching or mentoring others
                                        </SelectItem>
                                        <SelectItem value="Creative expression (music, drama, dance, art)">
                                            Creative expression (music, drama,
                                            dance, art)
                                        </SelectItem>
                                        <SelectItem value="Technical or media-related work">
                                            Technical or media-related work
                                        </SelectItem>
                                        <SelectItem value="Management, and Administration">
                                            Management, and Administration
                                        </SelectItem>
                                        <SelectItem value="Caring for people in need">
                                            Caring for people in need
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {availableUnits.length > 0 && (
                                <div className="space-y-3">
                                    <Label>Select a Service Unit</Label>
                                    <div className="space-y-3">
                                        {availableUnits.map(
                                            (unit) =>
                                                unit && (
                                                    <div
                                                        key={unit}
                                                        className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-appDark"
                                                    >
                                                        <Checkbox
                                                            id={unit}
                                                            checked={selectedUnits.includes(
                                                                unit,
                                                            )}
                                                            onCheckedChange={() =>
                                                                handleUnitSelection(
                                                                    unit,
                                                                )
                                                            }
                                                        />
                                                        <Label
                                                            htmlFor={unit}
                                                            className="text-sm font-normal cursor-pointer flex-1"
                                                        >
                                                            {unit}
                                                        </Label>
                                                    </div>
                                                ),
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-appRed hover:bg-appRed/90"
                        size="lg"
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
