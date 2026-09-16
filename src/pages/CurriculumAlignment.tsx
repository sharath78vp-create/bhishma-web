import { useState } from 'react';
import type { FC } from 'react';
import { Sparkles, MapPin } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import {
  CurriculumKPIs,
  AlignmentOverview,
  HeroCurriculumAudit,
  SkillCoverageComparison,
  CurriculumGaps,
  CurriculumDrift,
  CurriculumAuditTable,
  CurriculumTrajectory,
  CurriculumUpdateProposal,
  CurriculumMethodology,
  CurriculumPolicySignal
} from './curriculum/index';
import { mockCurriculumAudits } from '../mock';
import type { CurriculumAudit } from '../types';

export const CurriculumAlignment: FC = () => {
  // Hero course default: CURR-104 (DS-302 Business Intelligence & Enterprise Data Analytics)
  const defaultCourse =
    mockCurriculumAudits.find((c) => c.id === 'CURR-104') || mockCurriculumAudits[0];
  const [selectedCourse, setSelectedCourse] = useState<CurriculumAudit>(defaultCourse);

  const handleSelectCourse = (course: CurriculumAudit) => {
    setSelectedCourse(course);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* 1. Page Header with Hero Context & Preset Status */}
      <PageHeader
        title="Curriculum Alignment"
        description="Measure how closely training programs match the skills demanded by the evolving labour market."
        badge="PROTOTYPE &bull; SEPT 2026"
        badgeVariant="default"
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 border border-slate-700/80 text-xs shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-brand-400" />
              <span className="text-slate-400">Context:</span>
              <span className="font-semibold text-white">Telangana &rarr; AI &amp; Data &rarr; Data Analyst</span>
            </div>
            {selectedCourse.id === 'CURR-104' && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Hero Course Focus</span>
              </div>
            )}
          </div>
        }
      />

      {/* 2. Curriculum Performance KPI Strip (4 StatCards) */}
      <section aria-label="Curriculum Key Performance Indicators">
        <CurriculumKPIs />
      </section>

      {/* 3. Curriculum Alignment Spectrum Overview */}
      <section aria-label="Curriculum Alignment Spectrum">
        <AlignmentOverview
          onSelectCourse={handleSelectCourse}
          selectedCourseId={selectedCourse.id}
        />
      </section>

      {/* 4. Hero Curriculum Audit vs 12-Month Alignment Trajectory */}
      <section aria-label="Curriculum Audit Diagnostics and Trajectory">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Focal Curriculum Detail (7 cols) */}
          <div className="lg:col-span-7">
            <HeroCurriculumAudit course={selectedCourse} />
          </div>

          {/* Right: 12-Month Monitored Alignment Trend (5 cols) */}
          <div className="lg:col-span-5">
            <CurriculumTrajectory />
          </div>
        </div>
      </section>

      {/* 5. Industry Requirement vs Curriculum Coverage (Line-Item Comparison) */}
      <section aria-label="Industry Requirement vs Curriculum Coverage">
        <SkillCoverageComparison course={selectedCourse} />
      </section>

      {/* 6. Missing Competencies & Curriculum Drift Dual Grid */}
      <section aria-label="Curriculum Gaps and Drift">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <CurriculumGaps course={selectedCourse} />
          <CurriculumDrift course={selectedCourse} />
        </div>
      </section>

      {/* 7. Proposed Curriculum Overhaul Modules */}
      <section aria-label="Proposed Curriculum Modernization Modules">
        <CurriculumUpdateProposal course={selectedCourse} />
      </section>

      {/* 8. Complete Collegiate Curriculum Audit Registry (DataTable) */}
      <section aria-label="Curriculum Audit Registry">
        <CurriculumAuditTable
          onSelectCourse={handleSelectCourse}
          selectedCourseId={selectedCourse.id}
        />
      </section>

      {/* 9. Methodology: How BHISHMA Calculates Curriculum Alignment */}
      <section aria-label="Curriculum Alignment Methodology">
        <CurriculumMethodology />
      </section>

      {/* 10. Curricular Policy Mandate and Action CTA */}
      <section aria-label="Curriculum Policy Signal">
        <CurriculumPolicySignal course={selectedCourse} />
      </section>
    </div>
  );
};
