import type { FC } from 'react';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';
import { Database, CheckCircle2, FileCheck, Layers, Cpu, Globe } from 'lucide-react';
import type { EmergingSkillIntelligenceItem } from '../../../mock/emergingSkillsIntelligenceData';

interface DataSourcesConfidenceProps {
  selectedSkill?: EmergingSkillIntelligenceItem;
}

export const DataSourcesConfidence: FC<DataSourcesConfidenceProps> = ({ selectedSkill }) => {
  const sources = [
    {
      name: 'Enterprise Job Requisitions',
      icon: Database,
      telemetry: '185,400+ Live Postings',
      updateCycle: 'Daily Stream (Last sync: 2h ago)',
      confidence: 'High',
      desc: 'Automated natural language parsing of tech requisitions across national job exchanges and enterprise career portals.'
    },
    {
      name: 'Corporate & Industry Hiring Intent',
      icon: Layers,
      telemetry: '4,250+ Tracked Employers',
      updateCycle: 'Weekly Aggregation',
      confidence: 'High',
      desc: 'NASSCOM quarterly talent surveys, enterprise tech roadmaps, and venture capital hiring trends.'
    },
    {
      name: 'Institutional LMS & Training Logs',
      icon: Cpu,
      telemetry: '92,000+ Enrolled Learners',
      updateCycle: 'Bi-Weekly Refresh',
      confidence: 'High',
      desc: 'State polytechnic and university LMS platform enrollments, laboratory completions, and capstone submissions.'
    },
    {
      name: 'Compensation & Salary Benchmarks',
      icon: Globe,
      telemetry: '38,000+ Verified Offers',
      updateCycle: 'Monthly Analysis',
      confidence: 'Medium',
      desc: 'Placement office audited CTC filings, alumni survey feedback, and market salary indexes.'
    }
  ];

  return (
    <Card padding="lg" className="border-slate-200 shadow-sm bg-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-emerald-50 text-emerald-700">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Data Sources & Telemetry Confidence Validation
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Multi-source evidentiary lineage ensuring all emerging skill projections meet administrative reliability standards
            </p>
          </div>
        </div>

        <Badge variant="success" size="sm">
          Level-A Econometric Validation
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {sources.map((src) => {
          const IconComponent = src.icon;

          return (
            <div
              key={src.name}
              className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-700">
                    <IconComponent className="w-4 h-4 text-emerald-600" />
                  </div>
                  <Badge
                    variant={src.confidence === 'High' ? 'success' : 'purple'}
                    size="sm"
                  >
                    {src.confidence} Confidence
                  </Badge>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-900">{src.name}</h4>
                  <span className="text-[11px] font-black text-emerald-700 block mt-0.5">
                    {src.telemetry}
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {src.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/80 text-[10px] text-slate-400 font-medium">
                {src.updateCycle}
              </div>
            </div>
          );
        })}
      </div>

      {selectedSkill && (
        <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>
              Evidence backing <strong>{selectedSkill.name}</strong>: Sample size of <strong>{selectedSkill.evidenceSources.jobPostingsSample.toLocaleString()} requisitions</strong> across <strong>{selectedSkill.evidenceSources.employersTracked} employers</strong>.
            </span>
          </div>
          <Badge variant="success" size="sm">
            {selectedSkill.evidenceSources.confidenceGrade} Reliability
          </Badge>
        </div>
      )}
    </Card>
  );
};
