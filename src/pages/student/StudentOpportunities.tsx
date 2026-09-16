import { useState } from 'react';
import type { FC } from 'react';
import { useSkillBridge } from '../../context/SkillBridgeContext';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { mockOpportunities } from '../../mock/skillBridgeData';
import { Briefcase, MapPin, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import type { OpportunityItem } from '../../types/skillbridge';

export const StudentOpportunities: FC = () => {
  const { student } = useSkillBridge();
  const [selectedOpp, setSelectedOpp] = useState<OpportunityItem | null>(null);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-brand-600" />
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Recommended Opportunities
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Role matches tailored automatically from your verified skills and academic track.
          </p>
        </div>
        <Badge variant="brand" size="md">
          {mockOpportunities.length} Active Matches
        </Badge>
      </div>

      {/* Opportunities List */}
      <div className="grid grid-cols-1 gap-4">
        {mockOpportunities.map((opp) => (
          <Card key={opp.id} padding="md" className="hover:border-slate-300 transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">
                    {opp.roleTitle}
                  </h3>
                  <Badge variant="neutral" size="sm">
                    {opp.company}
                  </Badge>
                  <span className="text-slate-300">&bull;</span>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{opp.location}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                  <span>Salary: <strong className="text-slate-900">{opp.salaryRange}</strong></span>
                  <span>&bull;</span>
                  <span>Type: {opp.type}</span>
                </div>

                {/* Matched vs To Improve Skills */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1 text-xs">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-slate-400 font-medium">Matched:</span>
                    {opp.matchedSkills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[11px] font-medium border border-emerald-200">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-slate-400 font-medium">To improve:</span>
                    {opp.skillsToImprove.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 text-[11px] font-medium border border-amber-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Match Percentage & Action Button */}
              <div className="flex md:flex-col items-center md:items-end justify-between gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                <div className="text-left md:text-right">
                  <div className="text-xl font-bold text-brand-600 tabular-nums">
                    {opp.matchPct}%
                  </div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">
                    Skill Match
                  </span>
                </div>

                <button
                  onClick={() => setSelectedOpp(opp)}
                  className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Details Modal */}
      {selectedOpp && (
        <Modal
          isOpen={!!selectedOpp}
          onClose={() => setSelectedOpp(null)}
          title={selectedOpp.roleTitle}
          subtitle={`${selectedOpp.company} • ${selectedOpp.location}`}
          footer={
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedOpp(null)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
              <button
                onClick={() => setSelectedOpp(null)}
                className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-xs font-semibold text-white shadow-2xs"
              >
                Apply via Campus Placement Cell
              </button>
            </div>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
              <div>
                <span className="text-slate-500 block">Package Range</span>
                <span className="text-sm font-bold text-slate-900">{selectedOpp.salaryRange}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block">Calculated Match</span>
                <span className="text-sm font-bold text-brand-600">{selectedOpp.matchPct}%</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-slate-800 mb-1.5">Required Competencies</h4>
              <div className="space-y-1.5">
                <div className="p-2.5 rounded-lg border border-emerald-200 bg-emerald-50/50 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-emerald-900 block">Verified Skills ({selectedOpp.matchedSkills.length})</span>
                    <span className="text-emerald-700">{selectedOpp.matchedSkills.join(', ')}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg border border-amber-200 bg-amber-50/50 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-amber-900 block">Skills to Bridge ({selectedOpp.skillsToImprove.length})</span>
                    <span className="text-amber-700">{selectedOpp.skillsToImprove.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-slate-500 leading-relaxed pt-2">
              Note: SkillBridge connects verified student academic scores directly with accredited placement cell drives to streamline technical interview shortlisting.
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};
