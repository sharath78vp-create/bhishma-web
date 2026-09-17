import type { FC } from 'react';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';
import {
  ShieldCheck,
  Eye,
  Users,
  Compass,
  CheckCircle
} from 'lucide-react';

interface OfficerActionPanelProps {
  onOpenAdvisoryModalForGeneral?: () => void;
}

export const OfficerActionPanel: FC<OfficerActionPanelProps> = ({
  onOpenAdvisoryModalForGeneral
}) => {
  const advisories = [
    {
      title: 'Monitor AI & LLM Infrastructure Demand',
      icon: Eye,
      priority: 'High',
      desc: 'Verify if polytechnic and undergraduate CS labs include hands-on vector database & API orchestration practicals alongside classic machine learning theory.',
      suggestedAction: 'Schedule discussion with Board of Studies CS Committee'
    },
    {
      title: 'Evaluate Cloud Security & DevSecOps Shortages',
      icon: ShieldCheck,
      priority: 'High',
      desc: 'Cybersecurity hiring exhibits a large talent supply deficit (1-3 yr horizon). Consider industry-sponsored SOC certification electives in final-year semesters.',
      suggestedAction: 'Review industry-partnered micro-credential offerings'
    },
    {
      title: 'Track Regional Corridor Deficits (Bengaluru / Hyderabad)',
      icon: Users,
      priority: 'Moderate',
      desc: 'Hiring velocity in southern corridors is outstripping local graduation pipelines. Encourage inter-state student placement drives and internship exchange programs.',
      suggestedAction: 'Coordinate with State Placement & Internship Cell'
    },
    {
      title: 'Facilitate Bridge Modules for Legacy Tracks',
      icon: Compass,
      priority: 'Moderate',
      desc: 'Transition pathways confirm that students in traditional manual QA or legacy software development benefit from modular bridge courses into test automation and cloud services.',
      suggestedAction: 'Propose modular bridge curriculum credits'
    }
  ];

  return (
    <Card padding="lg" className="border-slate-200 shadow-sm bg-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-slate-100 text-slate-800">
            <ShieldCheck className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Officer Intelligence Brief & Strategic Recommendations
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Actionable policy and curriculum monitoring agenda for academic officers and administrative decision-makers
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 px-3 py-1 rounded-full font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Advisory Mode Only</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {advisories.map((item, idx) => {
          const IconComp = item.icon;
          const isHigh = item.priority === 'High';

          return (
            <div
              key={item.title}
              className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-700">
                      <IconComp className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="text-xs font-bold text-slate-900">
                      {idx + 1}. {item.title}
                    </span>
                  </div>
                  <Badge variant={isHigh ? 'danger' : 'warning'} size="sm">
                    {item.priority} Priority
                  </Badge>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed pl-1">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-medium">Recommended Officer Action:</span>
                <span className="font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
                  {item.suggestedAction}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Explicit Principle Box */}
      <div className="mt-4 p-3.5 bg-slate-900 text-white rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="text-slate-200 leading-snug">
            <strong>Decision Protocol:</strong> All metrics, forecasts, and impact advisories are decision-support instruments. The platform never imposes automated curriculum alterations or mandates.
          </span>
        </div>

        <button
          onClick={onOpenAdvisoryModalForGeneral}
          className="px-3.5 py-1.5 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-lg text-xs transition-colors shadow-sm whitespace-nowrap cursor-pointer"
        >
          View Full Advisory Dossier
        </button>
      </div>
    </Card>
  );
};
