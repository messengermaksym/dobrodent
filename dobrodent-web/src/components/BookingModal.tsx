"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, MapPin, Phone, Clock } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      // Delay reset to avoid showing layout shift during closing animation
      const timer = setTimeout(() => {
        setPhone("");
        setName("");
        setMessage("");
        setConsent(false);
        setIsSubmitted(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const formatPhone = (value: string) => {
    let digits = value.replace(/\D/g, '');
    if (digits.startsWith('38')) {
      digits = digits.substring(2);
    }
    digits = digits.substring(0, 10);

    let formatted = '+38 (';
    if (digits.length > 0) {
      formatted += digits.substring(0, 3);
    }
    if (digits.length > 3) {
      formatted += ') ' + digits.substring(3, 6);
    }
    if (digits.length > 6) {
      formatted += '-' + digits.substring(6, 8);
    }
    if (digits.length > 8) {
      formatted += '-' + digits.substring(8, 10);
    }
    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    
    if (!input) {
      setPhone('');
      return;
    }

    const digits = input.replace(/\D/g, '');
    if (digits === '' || digits === '3' || digits === '38') {
      if (input.length < phone.length) {
        setPhone('');
        return;
      }
    }

    setPhone(formatPhone(input));
  };

  const handlePhoneFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setPhone('+38 (');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In future this will connect to Telegram or backend
    setIsSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-lg bg-background rounded-2xl border border-border shadow-2xl overflow-hidden z-10 flex flex-col my-8 text-left"
            >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border bg-muted/30">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">Запис на прийом</h3>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground p-1.5 rounded-full hover:bg-muted transition-colors"
                aria-label="Закрити"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="booking-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="text-muted-foreground text-sm sm:text-base mb-6">
                      Заповніть форму, і наш адміністратор зв&apos;яжеться з вами найближчим часом для підтвердження дати та часу візиту.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label htmlFor="modal-name" className="block text-sm font-medium text-foreground mb-1.5">
                          Ваше ім&apos;я
                        </label>
                        <input
                          type="text"
                          id="modal-name"
                          className="w-full px-4 py-2.5 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                          placeholder="Іван Іванов"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="modal-phone" className="block text-sm font-medium text-foreground mb-1.5">
                          Номер телефону
                        </label>
                        <input
                          type="tel"
                          id="modal-phone"
                          className="w-full px-4 py-2.5 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                          placeholder="+38 (099) 000-00-00"
                          value={phone}
                          onChange={handlePhoneChange}
                          onFocus={handlePhoneFocus}
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="modal-message" className="block text-sm font-medium text-foreground mb-1.5">
                          Повідомлення (необов&apos;язково)
                        </label>
                        <textarea
                          id="modal-message"
                          rows={3}
                          className="w-full px-4 py-2.5 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none"
                          placeholder="Бажаний час або опис проблеми..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="modal-consent"
                            type="checkbox"
                            className="w-4 h-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                            checked={consent}
                            onChange={(e) => setConsent(e.target.checked)}
                            required
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="modal-consent" className="text-muted-foreground cursor-pointer select-none">
                            Я погоджуюся на обробку персональних даних.
                          </label>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md font-medium transition-colors shadow-md mt-2"
                      >
                        Надіслати заявку
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-screen"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-10 flex flex-col items-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                      className="bg-primary/10 p-4 rounded-full text-primary mb-6"
                    >
                      <Check className="w-12 h-12" />
                    </motion.div>
                    <h4 className="text-2xl font-bold text-foreground mb-3">Дякуємо, {name}!</h4>
                    <p className="text-muted-foreground leading-relaxed max-w-sm mb-8">
                      Ваша заявка успішно надіслана. Наш адміністратор зателефонує вам на номер <span className="font-semibold text-foreground">{phone}</span> найближчим часом.
                    </p>
                    <button
                      onClick={onClose}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 rounded-md font-medium transition-colors shadow-md"
                    >
                      Закрити
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
      )}
    </AnimatePresence>
  );
}
