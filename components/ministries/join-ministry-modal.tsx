"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  ministryFormSchema,
  type MinistryFormValues,
} from "@/lib/validations/ministry-form-schema";
import { toast } from "sonner";
import { joinMinistry } from "@/utils/axiosInstance";

interface JoinMinistryModalProps {
  isOpen: boolean;
  onClose: () => void;
  ministryName: string;
}

export const JoinMinistryModal: React.FC<JoinMinistryModalProps> = ({
  isOpen,
  onClose,
  ministryName,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<MinistryFormValues>({
    resolver: zodResolver(ministryFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      ministery: ministryName,
      reason: "",
    },
  });

  const onSubmit = async (data: MinistryFormValues) => {
    setIsSubmitting(true);

    try {
      const res = await joinMinistry(data);
      if (!res) {
        toast.error("Failed to send request. Please try again later.");
        return;
      }
      setIsSubmitted(true);
      toast.success("Request sent successfully!");
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send request. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    form.reset();
    setIsSubmitted(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => {
            onClose();
            setTimeout(resetForm, 300);
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-appDark">
                {isSubmitted ? "Request Sent!" : `Join ${ministryName}`}
              </h2>
              <button
                onClick={() => {
                  onClose();
                  setTimeout(resetForm, 300);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <Icon icon="mdi:close" className="w-6 h-6" />
              </button>
            </div>

            {isSubmitted ? (
              <div className="mt-2">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-center text-gray-500 mb-4">
                  Thank you for your interest in joining {ministryName}! We will
                  contact you soon with more information.
                </p>
                <div className="mt-4 flex justify-center">
                  <Button
                    onClick={() => {
                      onClose();
                      setTimeout(resetForm, 300);
                    }}
                  >
                    Close
                  </Button>
                </div>
              </div>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="focus:border-appRed focus:ring focus:ring-appRed focus:ring-opacity-50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            {...field}
                            className="focus:border-appRed focus:ring focus:ring-appRed focus:ring-opacity-50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            {...field}
                            className="focus:border-appRed focus:ring focus:ring-appRed focus:ring-opacity-50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Why do you want to join?</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={3}
                            className="focus:border-appRed focus:ring focus:ring-appRed focus:ring-opacity-50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-appRed text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-appRed focus:ring-opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </form>
              </Form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
