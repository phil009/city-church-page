"use client"

import type React from "react"

import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface LeaderApplicationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LeaderApplicationModal({ isOpen, onClose }: LeaderApplicationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    vision: "",
    availability: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      // In a real app, you would send this data to your backend
      console.log("Leader application submitted:", formData)
    }, 1500)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      experience: "",
      vision: "",
      availability: "",
    })
    setIsSubmitted(false)
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {
          onClose()
          setTimeout(resetForm, 300)
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {isSubmitted ? "Application Received!" : "Apply to Lead a Small Group"}
                  </Dialog.Title>
                  <button
                    onClick={() => {
                      onClose()
                      setTimeout(resetForm, 300)
                    }}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-center text-gray-500 mb-4">
                      Thank you for your interest in leading a small group! Our small groups coordinator will contact
                      you soon to discuss the next steps.
                    </p>
                    <div className="mt-4 flex justify-center">
                      <Button
                        onClick={() => {
                          onClose()
                          setTimeout(resetForm, 300)
                        }}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 mb-4">
                        Please fill out this form to apply to lead a small group. Our small groups coordinator will
                        contact you to discuss the next steps.
                      </p>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-appRed focus:ring focus:ring-appRed focus:ring-opacity-50"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-appRed focus:ring focus:ring-appRed focus:ring-opacity-50"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-appRed focus:ring focus:ring-appRed focus:ring-opacity-50"
                          />
                        </div>
                        <div>
                          <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                            Previous Leadership Experience
                          </label>
                          <textarea
                            id="experience"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-appRed focus:ring focus:ring-appRed focus:ring-opacity-50"
                            placeholder="Please share any previous experience leading small groups or other ministries."
                          />
                        </div>
                        <div>
                          <label htmlFor="vision" className="block text-sm font-medium text-gray-700">
                            Vision for Your Group
                          </label>
                          <textarea
                            id="vision"
                            name="vision"
                            value={formData.vision}
                            onChange={handleChange}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-appRed focus:ring focus:ring-appRed focus:ring-opacity-50"
                            placeholder="What type of group would you like to lead? What is your vision for this group?"
                          />
                        </div>
                        <div>
                          <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
                            Availability
                          </label>
                          <select
                            id="availability"
                            name="availability"
                            value={formData.availability}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-appRed focus:ring focus:ring-appRed focus:ring-opacity-50"
                          >
                            <option value="">Select your availability</option>
                            <option value="weekday-evenings">Weekday Evenings</option>
                            <option value="weekday-mornings">Weekday Mornings</option>
                            <option value="weekends">Weekends</option>
                            <option value="flexible">Flexible</option>
                          </select>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              onClose()
                              setTimeout(resetForm, 300)
                            }}
                            className="mr-2"
                          >
                            Cancel
                          </Button>
                          <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit Application"}
                          </Button>
                        </div>
                      </form>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

