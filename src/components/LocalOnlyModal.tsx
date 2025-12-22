import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { ExternalLink, Home } from "lucide-react";

interface LocalOnlyModalProps {
  open: boolean;
  onClose: () => void;
}

export function LocalOnlyModal({ open, onClose }: LocalOnlyModalProps) {
  const handleOpenInstructions = () => {
    window.open("https://github.com/ABorisovSfedu/InterView", "_blank", "noopener,noreferrer");
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-[90vw]">
        <DialogHeader>
          <DialogTitle className="text-lg">Демо-режим платформы</DialogTitle>
          <DialogDescription className="pt-2 text-sm leading-relaxed">
            В настоящее время опубликована демонстрационная версия интерфейса.
            Серверная часть платформы работает в локальной среде разработки.
            Для тестирования полного функционала необходимо запустить проект локально.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 mt-4 -mx-6 -mb-6 px-6 pb-6">
          <Button
            onClick={handleOpenInstructions}
            className="w-full"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Открыть инструкцию запуска
          </Button>
          <Button
            variant="outline"
            onClick={handleGoHome}
            className="w-full"
          >
            <Home className="w-4 h-4 mr-2" />
            Вернуться на главную
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

