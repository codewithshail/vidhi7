"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { getLawyersInfo } from "@/actions/lawyer.action";
import { IconCall, IconLawyerSolid, IconLoader, IconMail } from "@/lib/icons";

import LawyerRegisterationForm from "./_components/lawyer-registeration-form";
import SearchBar from "./_components/search-bar";
import {  popularCategories } from "./constant";

function Dashboard() {
  const [showLawyerRegistrationForm, setShowLawyerRegistrationForm] =
    useState(false);

  const { data: topLawyers, isLoading } = useQuery({
    queryKey: ["lawyerInfo"],
    queryFn: async () => {
      const lawyersInfo = await getLawyersInfo();
      return [...(lawyersInfo ?? [])];
    },
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Find Lawyer</h2>
        <Button
          type="button"
          variant={"secondary"}
          className="flex items-center gap-2 rounded-full border bg-secondary/60"
          onClick={() => setShowLawyerRegistrationForm(true)}
        >
          <IconLawyerSolid className="h-5" />
          <span>Register as Lawyer</span>
        </Button>
      </div>

      <LawyerRegisterationForm
        showModal={showLawyerRegistrationForm}
        onClose={() => setShowLawyerRegistrationForm(false)}
      />

      <SearchBar />

      <div className="space-y-4">
        <h3 className="font-medium">Popular Categories</h3>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(132px,1fr))] gap-4">
          {popularCategories.map(({ Icon, ...category }) => (
            <button
              key={category.name}
              type="button"
              className="flex flex-col items-center gap-2 rounded-lg border bg-secondary/20 p-3 transition-colors hover:bg-secondary/40"
            >
              <div className="rounded-full bg-secondary p-2.5">
                <Icon className="h-6 w-6" />
              </div>
              <p className="text-sm">{category.name}</p>
              <p className="text-xs text-muted-foreground">
                {category.services.join(", ")}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Top Lawyers Near You</h3>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-6">
          {isLoading && (
            <div className="flex h-20 items-center justify-center">
              <IconLoader className="h-7 animate-spin text-foreground" />
            </div>
          )}
          {topLawyers?.map((lawyer) => (
            <div
              key={`lawyer-${lawyer.id}`}
              className="flex select-none flex-col space-y-4 rounded-lg border p-3 text-left align-top hover:bg-secondary/20"
            >
              <div className="flex gap-4">
                <img
                  src={lawyer.photo}
                  className="h-16 rounded-full"
                  alt="lawyer"
                />
                <div className="space-y-2">
                  <p className="font-bold">
                    {lawyer.firstName} {lawyer.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {lawyer.specialization}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {lawyer.services.map((service: string) => (
                      <span
                        key={`service-${lawyer.id}-${service}`}
                        className="rounded-full bg-secondary/60 p-1 px-2 text-xs"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">{lawyer.bio}</p>

              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm text-muted-foreground">
                    Consultation Fee
                  </span>
                  <span className="font-medium">
                    {lawyer.consultationFees == 0
                      ? "Free Consultation"
                      : `₹ ${lawyer.consultationFees} / hour`}
                  </span>
                </div>

                <div className="space-x-2">
                  <a
                    href={`tel:+91${lawyer.phoneNumber}`}
                    className="inline-flex rounded-full border bg-transparent px-4 py-2 transition-colors hover:bg-secondary"
                  >
                    <IconCall className="h-5" />
                  </a>
                  <a
                    href={`mailto:${lawyer.email}`}
                    className="inline-flex rounded-full border bg-transparent px-4 py-2 transition-colors hover:bg-secondary"
                  >
                    <IconMail className="h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
