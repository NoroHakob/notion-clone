"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog"
import { useSettings } from "@/hooks/use-settings"
import { Label } from "@/components/ui/label"
import { ModeToggle } from "@/components/mode-toggle"

export const SettingsModal = () => {
    const settings = useSettings()

    return (
        <Dialog open={settings.isOpen} onOpenChange={settings.onClose}> 
            <DialogContent>
                {/* Accessible title and description */}
                <DialogHeader className="border-b pb-3">
                    <DialogTitle>My settings</DialogTitle>
                    <DialogDescription>
                        Customize how Notion looks on your device
                    </DialogDescription>
                </DialogHeader>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-col gap-y-1">
                        <Label>Appearance</Label>
                        <span className="text-[0.8rem] text-muted-foreground">
                            Customize how Notion looks on your device
                        </span>
                    </div>
                    <ModeToggle />
                </div>
            </DialogContent>
        </Dialog>
    )
}
