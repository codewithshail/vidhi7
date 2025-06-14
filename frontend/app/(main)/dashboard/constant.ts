import {
  IconCorporate,
  IconCriminal,
  IconHome,
  IconPersonalInjury,
  IconRealEstate,
  IconTaxLaw,
} from "@/lib/icons";
import { Lawyer } from "@/types/lawyer";

export const popularCategories = [
  {
    name: "Family Law",
    services: ["Divorce", "Custody"],
    Icon: IconHome,
  },
  {
    name: "Corporate",
    services: ["Business", "Contracts"],
    Icon: IconCorporate,
  },
  {
    name: "Criminal",
    services: ["Defense", "Appeals"],
    Icon: IconCriminal,
  },
  {
    name: "Personal Injury",
    services: ["Accidents", "Malpractice"],
    Icon: IconPersonalInjury,
  },
  {
    name: "Tax Law",
    services: ["Planning", "Disputes"],
    Icon: IconTaxLaw,
  },
  {
    name: "Real Estate",
    services: ["Property", "Leasing"],
    Icon: IconRealEstate,
  },
];


