import { Phone, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function FloatingButtons() {
  return (
    <>
      {/* WhatsApp */}
      <motion.a
        href="https://api.whatsapp.com/send?l=en&phone=+918377072990&text=Welcome%20To%20Right%20Ads%20Digital"
        target="_blank"
        rel="noreferrer"
        className="floating-btn"
        style={{ bottom: '90px', right: '24px', background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.15 }}
        title="Chat on WhatsApp"
      >
        <MessageCircle size={24} color="white" />
      </motion.a>

      {/* Call */}
      <motion.a
        href="tel:+918377072990"
        className="floating-btn"
        style={{ bottom: '28px', right: '24px', background: 'linear-gradient(135deg, #6366f1, #3b82f6)' }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.15 }}
        title="Call Us"
      >
        <Phone size={22} color="white" />
      </motion.a>
    </>
  )
}
