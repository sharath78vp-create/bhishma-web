import { useState } from 'react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertOctagon, 
  BellRing, 
  Clock, 
  ShieldAlert, 
  MapPin, 
  ArrowRight, 
  AlertTriangle
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { PageHeader } from '../components/ui/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { mockEarlyWarnings } from '../mock';
import type { EarlyWarningAlert } from '../types';

export const EarlyWarnings: FC = () => {
  const [selectedSeverity, setSelectedSeverity] = useState<'all' | 'critical' | 'warning'>('all');

  const filteredWarnings = mockEarlyWarnings.filter((w) => {
    if (selectedSeverity === 'all') return true;
    return w.severity === selectedSeverity;
  });

  const criticalCount = mockEarlyWarnings.filter((w) => w.severity === 'critical').length;
  const warningCount = mockEarlyWarnings.filter((w) => w.severity === 'warning').length;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* 1. Page Header */}
      <PageHeader
        title="Early Warning Radar"
        description="Heuristic anomaly detection identifying emergent talent supply bottlenecks, skill obsolescence risks, and academic lead times."
        badge="PROTOTYPE • SEPT 2026"
        badgeVariant="default"
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 border border-slate-700/80 text-xs shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-brand-400" />
              <span className="text-slate-400">Monitoring Scope:</span>
              <span className="font-semibold text-white">National + Telangana Cluster</span>
            </div>
            <Badge variant="warning" size="sm" className="font-mono text-xs">
              3 ACTIVE ALERTS
            </Badge>
          </div>
        }
      />

      {/* 2. Key Alert Metrics Strip */}
      <section aria-label="Early Warning Metrics">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Active Anomaly Alerts"
            value={mockEarlyWarnings.length}
            change="3 Sectors Flagged"
            icon={BellRing}
            subtitle="Monitored across industry clusters"
          />
          <StatCard
            title="Critical Severities"
            value={criticalCount}
            change="Immediate Action"
            changeType="negative"
            icon={AlertOctagon}
            subtitle="Severe collegiate talent bottlenecks"
          />
          <StatCard
            title="Average Lead Horizon"
            value="4.3 Months"
            change="Pre-Impact Window"
            icon={Clock}
            subtitle="Decision runway before bottleneck"
          />
          <StatCard
            title="Institutional Alert Status"
            value="Elevated"
            change="Prototype Monitor"
            changeType="negative"
            icon={ShieldAlert}
            subtitle="Benchmark notifications active"
          />
        </div>
      </section>

      {/* 3. Filter Controls & Alerts Grid */}
      <section aria-label="Active Early Warnings">
        <Card className="border-slate-800 bg-slate-900/60">
          <CardHeader
            action={
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-mono">
                  <button
                    onClick={() => setSelectedSeverity('all')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      selectedSeverity === 'all'
                        ? 'bg-brand-500/20 text-brand-300 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    All ({mockEarlyWarnings.length})
                  </button>
                  <button
                    onClick={() => setSelectedSeverity('critical')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      selectedSeverity === 'critical'
                        ? 'bg-rose-500/20 text-rose-300 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Critical ({criticalCount})
                  </button>
                  <button
                    onClick={() => setSelectedSeverity('warning')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      selectedSeverity === 'warning'
                        ? 'bg-amber-500/20 text-amber-300 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Elevated ({warningCount})
                  </button>
                </div>
              </div>
            }
          >
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <CardTitle>Emergent Talent Shortages &amp; Anomaly Signals</CardTitle>
                <CardDescription>
                  Heuristic alerts triangulated from job requisition momentum and collegiate graduation rates
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {filteredWarnings.map((alert: EarlyWarningAlert) => {
                const isCritical = alert.severity === 'critical';

                return (
                  <div
                    key={alert.id}
                    className={`p-5 rounded-xl border transition-all ${
                      isCritical
                        ? 'border-rose-500/30 bg-slate-900 shadow-sm'
                        : 'border-amber-500/30 bg-slate-900 shadow-sm'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-300">
                            {alert.id}
                          </span>
                          <span className="text-slate-600">&bull;</span>
                          <Badge
                            variant={isCritical ? 'critical' : 'warning'}
                            size="sm"
                            className="font-mono text-[10px] uppercase font-bold"
                          >
                            {alert.severity} Priority
                          </Badge>
                          <span className="text-slate-600">&bull;</span>
                          <Badge variant="default" size="sm" className="text-[10px]">
                            {alert.sector}
                          </Badge>
                          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 ml-auto md:ml-0">
                            <Clock className="w-3.5 h-3.5 text-amber-400" />
                            <span>Lead Window: <strong>{alert.predictedImpactHorizon}</strong></span>
                          </div>
                        </div>

                        <h3 className="text-base font-bold text-white leading-snug">
                          {alert.title}
                        </h3>

                        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                          {alert.description}
                        </p>

                        {/* Affected Roles Chips */}
                        <div className="pt-2 flex flex-wrap items-center gap-1.5">
                          <span className="text-[11px] font-mono text-slate-400 mr-1">
                            Affected Roles:
                          </span>
                          {alert.affectedRoles.map((role: string) => (
                            <span
                              key={role}
                              className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700/80 text-[11px] text-slate-200 font-mono"
                            >
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Box */}
                      <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 md:max-w-xs shrink-0 flex flex-col justify-between space-y-3">
                        <div>
                          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1">
                            Recommended Immediate Intervention
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {alert.recommendedImmediateAction}
                          </p>
                        </div>

                        <Link to="/recommendations" className="block pt-2">
                          <Button
                            variant={isCritical ? 'primary' : 'outline'}
                            size="sm"
                            className="w-full gap-1.5 text-xs justify-between"
                          >
                            <span>Inspect Policy Response</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 4. Concluding Integration Banner */}
      <section aria-label="Early Warning Policy Integration">
        <div className="p-5 rounded-xl border border-slate-800 bg-slate-900 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-semibold text-white">
              Bridge Anomaly Alerts to Verified Policy Directives
            </h4>
            <p className="text-xs text-slate-300 max-w-2xl">
              Early warning signals automatically inform the Recommendation Engine to generate subsidized lab sandbox grants, co-op mandates, and faculty upskilling schemes.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link to="/what-if-simulator">
              <Button variant="outline" size="sm">
                Test in Simulator
              </Button>
            </Link>
            <Link to="/recommendations">
              <Button variant="primary" size="sm" className="gap-1.5 shadow-sm">
                <span>View Recommendations</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
