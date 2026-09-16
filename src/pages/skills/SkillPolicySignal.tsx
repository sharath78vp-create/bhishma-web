import type { FC } from 'react';
import { ArrowRight, GraduationCap, Sparkles, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export const SkillPolicySignal: FC = () => {
  return (
    <Card className="border-slate-800 bg-slate-900 shadow-sm">
      <CardContent className="p-5 sm:p-6 lg:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-brand-500/20 text-brand-400 border border-brand-500/30">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-brand-400 uppercase tracking-wider">
                  Skill-to-Curriculum Alignment Policy Signal
                </span>
                <Badge variant="critical" size="sm" className="font-mono text-[10px] uppercase">
                  Action Required
                </Badge>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mt-0.5">
                Modern Data &amp; Cloud Analytics Curricular Deficit
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Badge variant="info" className="text-xs">
              AI &amp; Data Sector
            </Badge>
            <Badge variant="default" className="text-xs">
              Telangana Collegiate Focus
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          <div className="lg:col-span-8 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Evidence-Backed Curricular Misalignment</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              High-growth analytics skills (<strong>Advanced SQL &amp; dbt</strong>, <strong>Snowflake</strong>, <strong>GenAI Agent Tooling</strong>) are exhibiting unprecedented hiring velocity (<strong>+44% to +156% YoY</strong>), while accredited university syllabi (e.g., DS-302) maintain only a <strong>46% alignment score</strong>. This forces Indian technology employers into mandatory 5.4-month retraining cycles.
            </p>
            <p className="text-xs text-slate-400">
              Immediate state policy mandate: Inspect audited collegiate syllabi to incorporate cloud data warehouses and dbt analytics engineering modules into 4th-year curricula.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-center space-y-2.5">
            <Link
              to="/curriculum-alignment"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs sm:text-sm font-bold shadow-sm transition-all text-center"
            >
              <BookOpen className="w-4 h-4" />
              <span>Review curriculum alignment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <span className="text-[11px] text-slate-500 text-center block font-mono">
              Proceeds to Step 4: Curriculum Diagnostic Suite
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
