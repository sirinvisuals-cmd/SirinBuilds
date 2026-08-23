import React from 'react';
import {
  Layout,
  ShoppingBag,
  Smartphone,
  Server,
  Globe,
  TrendingUp,
  Palette,
  Wrench,
  Cpu,
  CheckCircle2,
  Clock,
  Shield,
  MessageSquare,
  Zap,
  ShieldCheck,
  Headphones,
  Sparkles,
  FileText,
  Lock,
  Gauge,
  Target,
  Lightbulb,
  LayoutGrid,
  Code2,
  CheckSquare,
  Rocket,
  Check,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Mail,
  Instagram,
  Youtube,
  Menu,
  X,
  Phone,
  Send,
  HelpCircle,
  Layers,
  Monitor,
  Tablet,
  CheckCircle,
  Copy,
  Sliders,
  DollarSign,
  Briefcase,
  Search,
  ArrowUpRight,
  Flame,
} from 'lucide-react';

interface IconHelperProps {
  name: string;
  className?: string;
}

export const IconHelper: React.FC<IconHelperProps> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'Layout':
      return <Layout className={className} />;
    case 'ShoppingBag':
      return <ShoppingBag className={className} />;
    case 'Smartphone':
      return <Smartphone className={className} />;
    case 'Server':
      return <Server className={className} />;
    case 'Globe':
      return <Globe className={className} />;
    case 'TrendingUp':
      return <TrendingUp className={className} />;
    case 'Palette':
      return <Palette className={className} />;
    case 'Wrench':
      return <Wrench className={className} />;
    case 'Cpu':
      return <Cpu className={className} />;
    case 'CheckCircle2':
      return <CheckCircle2 className={className} />;
    case 'Clock':
      return <Clock className={className} />;
    case 'Shield':
      return <Shield className={className} />;
    case 'MessageSquare':
      return <MessageSquare className={className} />;
    case 'MessageSquareCheck':
      return <MessageSquare className={className} />;
    case 'Zap':
      return <Zap className={className} />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} />;
    case 'Headphones':
      return <Headphones className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'FileText':
      return <FileText className={className} />;
    case 'Lock':
      return <Lock className={className} />;
    case 'Gauge':
      return <Gauge className={className} />;
    case 'Target':
      return <Target className={className} />;
    case 'Lightbulb':
      return <Lightbulb className={className} />;
    case 'LayoutGrid':
      return <LayoutGrid className={className} />;
    case 'Code2':
      return <Code2 className={className} />;
    case 'CheckSquare':
      return <CheckSquare className={className} />;
    case 'Rocket':
      return <Rocket className={className} />;
    case 'Layers':
      return <Layers className={className} />;
    case 'Monitor':
      return <Monitor className={className} />;
    case 'Tablet':
      return <Tablet className={className} />;
    case 'Briefcase':
      return <Briefcase className={className} />;
    case 'Flame':
      return <Flame className={className} />;
    default:
      return <CheckCircle className={className} />;
  }
};
