'use client'

import { motion } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { ServerFormSkeleton } from "@/components/skeletons/server-form"
import { SaveIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
import { ServerFormProps } from '@/lib/types'
import { MotionCard, MotionCardContent, MotionInput, MotionTextarea, MotionButton } from "@/components/motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ImageUpload from "@/components/image-upload"
import { UploadIcon } from "lucide-react"
import { useBlinkStore } from "@/lib/contexts/zustand/blinkStore"

function ServerForm({
  DiscordRoles,
  setDiscordRoles,
  formErrors,
  onSubmit,
  isLoading,
}: ServerFormProps & { isLoading: boolean }) {
  const { formData, setFormData } = useBlinkStore();

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(field, value);
  };

  const handleDiscordRoleToggle = (DiscordRoleId: string) => {
    setDiscordRoles(prevDiscordRoles =>
      prevDiscordRoles.map(DiscordRole =>
        DiscordRole.id === DiscordRoleId ? { ...DiscordRole, enabled: !DiscordRole.enabled } : DiscordRole
      )
    );
  };

  const handleDiscordRolePriceChange = (DiscordRoleId: string, price: string) => {
    const numericPrice = parseFloat(price);
    if (!isNaN(numericPrice)) {
      setDiscordRoles(prevDiscordRoles =>
        prevDiscordRoles.map(DiscordRole =>
          DiscordRole.id === DiscordRoleId ? { ...DiscordRole, price: numericPrice } : DiscordRole
        )
      );
    }
  };

  if (isLoading) {
    return <ServerFormSkeleton />;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <MotionCardContent initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Label htmlFor="name">Blink Title</Label>
        <MotionInput
          id="name"
          placeholder="Enter a title for your blink"
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        {formErrors.name && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-destructive text-sm mt-1">
            {formErrors.name}
          </motion.p>
        )}
      </MotionCardContent>

      <MotionCardContent initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Label htmlFor="name">Blink Image URL</Label>
        <MotionInput
          id="name"
          placeholder="Enter an image URL for your blink"
          value={formData.title}
          onChange={(e) => handleInputChange("iconUrl", e.target.value)}
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        {formErrors.name && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-destructive text-sm mt-1">
            {formErrors.name}
          </motion.p>
        )}
      </MotionCardContent>

      <MotionCardContent initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <Label htmlFor="description">Blink Description</Label>
        <MotionTextarea
          id="description"
          placeholder="Enter blink description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        {formErrors.description && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-destructive text-sm mt-1">
            {formErrors.description}
          </motion.p>
        )}
      </MotionCardContent>

      <MotionButton type="submit" className="w-full" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <SaveIcon className="mr-2 h-4 w-4" />
        Save
      </MotionButton>
    </form>
  );
}

export default ServerForm;
