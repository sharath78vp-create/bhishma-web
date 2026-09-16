import type { FC } from 'react';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';
import { ShieldAlert, TrendingUp, Users, ArrowUpRight, Clock, AlertTriangle } from 'lucide-react';
import type { EmergingSkillIntelligenceItem } from '../../../mock/emergingSkillsIntelligenceData';

interface PotentialShortagesPanelProps {
  skills: EmergingSkillIntelligenceItem[];
  onSelectSkill: (skillId: string) => void;
}

export const PotentialShortagesPanel: FC<PotentialShortagesPanelProps> = ({
  skills,
  onSelectSkill
}) => {
  // Sort by highest shortage risk first
  const shortageSkills = [...skills].filter(
    (s) => s.shortageRiskLevel === 'High' || s.shortageRiskLevel === 'Moderate'
  );

  return (
    <Card padding="lg" className="border-slate-200 shadow-sm bg-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-rose-50 text-rose-700">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Potential Future Skill Shortages (Supply vs. Demand Deficit)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Identification of emerging competencies where industry demand expansion outpaces regional talent graduation pipelines
            </p>
          </div>
        </div>

        <Badge variant="danger" size="sm">
          {shortageSkills.length} Priority Watchlist Skills
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {shortageSkills.map((skill) => {
          const isHighRisk = skill.shortageRiskLevel === 'High';

          return (
            <div
              key={skill.id}
              onClick={() => onSelectSkill(skill.id)}
              className="bg-slate-50 hover:bg-slate-100/80 border border-slate-200 hover:border-slate-300 rounded-xl p-4 transition-all flex flex-col justify-between cursor-pointer group shadow-2xs"
            >
              <div>
                {/* Card Top: Name & Risk Badge */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                      {skill.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                      {skill.name}
                    </h3>
                  </div>
                  <Badge variant={isHighRisk ? 'danger' : 'warning'} size="sm">
                    {skill.shortageRiskLevel} Risk
                  </Badge>
                </div>

                {/* Supply vs Demand Comparison Box */}
                <div className="bg-white border border-slate-200/80 rounded-lg p-3 my-3 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-slate-600">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Hiring Surge:</span>
                    </div>
                    <span className="font-extrabold text-emerald-700">+{skill.growthYoY}% YoY</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-slate-600">
                      <Users className="w-3.5 h-3.5 text-sky-600" />
                      <span>Talent Pipeline:</span>
                    </div>
                    <span className="font-bold text-slate-800">{skill.talentSupplyLevel}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1.5 border-t border-slate-100">
                    <span className="text-slate-500 font-medium">Supply-Demand Gap:</span>
                    <span className={`font-black ${isHighRisk ? 'text-rose-700' : 'text-amber-700'}`}>
                      {skill.supplyDemandGap}
                    </span>
                  </div>
                </div>
              </div>

              {/* Time Horizon & Advisory Trigger */}
              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1 text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Horizon: <strong className="text-slate-700">{skill.shortageTimeHorizon}</strong></span>
                </div>

                <span className="text-orange-600 font-semibold group-hover:underline flex items-center gap-0.5">
                  Inspect Gap <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Advisory Guidance Box */}
      <div className="mt-4 p-3 bg-rose-50/60 border border-rose-200/70 rounded-lg flex items-start gap-2 text-xs text-rose-950">
        <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed text-[11px]">
          <strong>Shortage Dynamics Principle:</strong> High job posting demand does not automatically create a shortage if graduate pipelines are equally large. Shortage alerts only trigger when verified institutional graduate capacity falls significantly below forecasted hiring requisitions.
        </p>
      </div>
    </Card>
  );
};
