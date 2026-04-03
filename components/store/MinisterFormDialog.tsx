"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const TEAM_OPTIONS = [
    "Maturity",
    "Membership",
    "Ministry",
    "Missions",
    "Guest Services",
    "Brand Comm",
    "Production",
    "Magnification",
    "Group Life",
    "Service Programming",
    "Creative Arts Department",
];

const ministerFormSchema = z.object({
    fullName: z.string().min(2, "Full name is required"),
    primaryUnit: z.string().min(2, "Primary unit is required"),
    teamDirectorate: z.string().min(2, "Team / Directorate is required"),
    audioTitle: z.string(),
    commitment: z.literal(true, {
        errorMap: () => ({
            message: "You must commit to listening and applying this teaching",
        }),
    }),
});

type MinisterFormValues = z.infer<typeof ministerFormSchema>;

interface MinisterFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    productName: string;
    paystackUrl: string;
}

export function MinisterFormDialog({
    open,
    onOpenChange,
    productName,
    paystackUrl,
}: MinisterFormDialogProps) {
    const [step, setStep] = useState<"ask" | "form">("ask");
    const [submitting, setSubmitting] = useState(false);

    const form = useForm<MinisterFormValues>({
        resolver: zodResolver(ministerFormSchema),
        defaultValues: {
            fullName: "",
            primaryUnit: "",
            teamDirectorate: "",
            audioTitle: productName,
            commitment: undefined,
        },
    });

    function handleNotMinister() {
        onOpenChange(false);
        window.open(paystackUrl, "_blank");
    }

    function handleIsMinister() {
        setStep("form");
    }

    async function onSubmit(values: MinisterFormValues) {
        setSubmitting(true);
        // Open window immediately (must be synchronous to avoid popup block)
        const paymentWindow = window.open(paystackUrl, "_blank");
        try {
            const response = await fetch("/api/audio-purchase", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...values,
                    date: new Date().toISOString(),
                }),
            });

            if (!response.ok) {
                throw new Error("Submission failed");
            }

            toast.success("Details saved! Redirecting to payment...");
            onOpenChange(false);
        } catch {
            // Close the payment window if submission failed
            paymentWindow?.close();
            toast.error("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    }

    function handleDialogClose(open: boolean) {
        if (!open) {
            setStep("ask");
            form.reset();
        }
        onOpenChange(open);
    }

    return (
        <Dialog
            open={open}
            onOpenChange={handleDialogClose}
        >
            <DialogContent className="sm:max-w-md bg-white">
                {step === "ask" ? (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-lg">
                                Are you a minister?
                            </DialogTitle>
                        </DialogHeader>
                        <p className="text-sm text-gray-500 -mt-2">
                            Ministers are asked to fill a short form before
                            purchasing this audio.
                        </p>
                        <div className="flex gap-3 mt-2">
                            <Button
                                className="flex-1 bg-appDark text-white"
                                onClick={handleIsMinister}
                            >
                                Yes, I am
                            </Button>
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={handleNotMinister}
                            >
                                No, proceed
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle>Minister Details</DialogTitle>
                        </DialogHeader>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Your full name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="primaryUnit"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Primary Unit</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Your primary unit"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="teamDirectorate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Team / Directorate
                                            </FormLabel>
                                            <p className="text-xs text-gray-400 -mt-1">
                                                What Team/Directorate does your
                                                unit belong to?
                                            </p>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a team or directorate" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="bg-white">
                                                    {TEAM_OPTIONS.map(
                                                        (option) => (
                                                            <SelectItem
                                                                key={option}
                                                                value={option}
                                                            >
                                                                {option}
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="audioTitle"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Audio Title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    readOnly
                                                    className="bg-blue-50 cursor-default"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="commitment"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-start gap-3">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                        className="mt-0.5"
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal leading-snug cursor-pointer">
                                                    I commit to listening and
                                                    applying this teaching.
                                                </FormLabel>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    className="w-full bg-appRed text-white"
                                    disabled={submitting}
                                >
                                    {submitting
                                        ? "Submitting..."
                                        : "Submit & Proceed to Payment"}
                                </Button>
                            </form>
                        </Form>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
