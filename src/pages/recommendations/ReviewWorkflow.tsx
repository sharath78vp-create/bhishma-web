import { useState } from 'react';
import type { FC } from 'react';
import { UserCheck, CheckCircle2, Edit3, XCircle, RotateCcw } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import type { PolicyIntervention } from '../../types';

interface ReviewWorkflowProps {
  policy: PolicyIntervention;
}

export type ReviewStatus = 'pending' | 'approved' | 'modified' | 'rejected';

export const ReviewWorkflow: FC<ReviewWorkflowProps> = ({ policy }) => {
  const [reviewStatus, setReviewStatus] = useState<ReviewStatus>('pending');
  const [reviewerNote, setReviewerNote] = useState('');
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  // Editable parameters for modify modal
  const [adjustedBudget, setAdjustedBudget] = useState(policy.estimatedCostCr);
  const [adjustedMonths, setAdjustedMonths] = useState(policy.implementationTimeMonths);
  const [modifyNotes, setModifyNotes] = useState('');
  const [rejectReason, setRejectReason] = useState('');

  const handleApprove = () => {
    setReviewStatus('approved');
  };

  const handleSaveModification = () => {
    setReviewStatus('modified');
    setIsModifyModalOpen(false);
  };

  const handleConfirmReject = () => {
    setReviewStatus('rejected');
    setIsRejectModalOpen(false);
  };

  const handleReset = () => {
    setReviewStatus('pending');
    setReviewerNote('');
  };

  return (
    <Card id="review-workflow-card" className="border-slate-800 bg-slate-900/80">
      <CardHeader
        action={
          <div className="flex items-center gap-2">
            <Badge
              variant={
                reviewStatus === 'approved'
                  ? 'success'
                  : reviewStatus === 'modified'
                  ? 'warning'
                  : reviewStatus === 'rejected'
                  ? 'critical'
                  : 'info'
              }
              className="font-mono text-[10px] uppercase font-bold"
            >
              {reviewStatus === 'approved'
                ? 'Approved in Prototype'
                : reviewStatus === 'modified'
                ? 'Modification Recorded'
                : reviewStatus === 'rejected'
                ? 'Rejected'
                : 'Pending Governance Review'}
            </Badge>
          </div>
        }
      >
        <div className="flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-brand-400" />
          <CardTitle>Human-in-the-Loop Policy Governance</CardTitle>
        </div>
        <CardDescription>
          Institutional decision workflow enabling ministry officers to inspect, parameterize, or approve the algorithmic recommendation
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 space-y-4">
        {/* Prototype status banner */}
        <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between gap-2">
          <span>
            <strong>Governance Prototype Notice:</strong> Actions executed below simulate state approval workflows. Decision state is maintained locally for SIH 2026 jury demonstration.
          </span>
          {reviewStatus !== 'pending' && (
            <button
              type="button"
              onClick={handleReset}
              className="text-[10px] text-brand-400 hover:text-brand-300 flex items-center gap-1 shrink-0"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset State</span>
            </button>
          )}
        </div>

        {/* Current State Indicator */}
        {reviewStatus === 'approved' && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <h5 className="text-xs font-bold text-emerald-300">
                Policy Mandate Approved for Staging Execution
              </h5>
              <p className="text-[11px] text-slate-300 mt-0.5">
                {policy.id} ({policy.title}) has been confirmed by reviewer. Ready for simulation modeling in Step 7.
              </p>
            </div>
          </div>
        )}

        {reviewStatus === 'modified' && (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3">
            <Edit3 className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <h5 className="text-xs font-bold text-amber-300">
                Policy Parameters Adjusted by Reviewer
              </h5>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Adjusted Budget: ₹{adjustedBudget} Cr &bull; Horizon: {adjustedMonths} Months &bull; Notes: &ldquo;{modifyNotes || 'Parameters re-calibrated'}&rdquo;
              </p>
            </div>
          </div>
        )}

        {reviewStatus === 'rejected' && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3">
            <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <div>
              <h5 className="text-xs font-bold text-rose-300">
                Recommendation Rejected / Returned for Re-evaluation
              </h5>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Reason: &ldquo;{rejectReason || 'Returned by policy officer'}&rdquo;
              </p>
            </div>
          </div>
        )}

        {/* Reviewer Note Input */}
        <div className="space-y-1.5">
          <label htmlFor="reviewer-note" className="text-xs font-semibold text-slate-300 block">
            Reviewer Remarks / Institutional Justification:
          </label>
          <textarea
            id="reviewer-note"
            rows={2}
            value={reviewerNote}
            onChange={(e) => setReviewerNote(e.target.value)}
            placeholder="Add institutional context, committee resolution number, or revision directives..."
            className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          <Button
            variant="primary"
            size="sm"
            onClick={handleApprove}
            disabled={reviewStatus === 'approved'}
            className="inline-flex items-center gap-1.5 font-bold"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Approve Mandate</span>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsModifyModalOpen(true)}
            className="inline-flex items-center gap-1.5"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Modify Parameters</span>
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={() => setIsRejectModalOpen(true)}
            disabled={reviewStatus === 'rejected'}
            className="inline-flex items-center gap-1.5"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Reject / Return</span>
          </Button>
        </div>
      </CardContent>

      {/* Modify Modal */}
      <Modal
        isOpen={isModifyModalOpen}
        onClose={() => setIsModifyModalOpen(false)}
        title={`Adjust Parameters: ${policy.id}`}
        description="Re-calibrate capital allocation and implementation horizon for prototype evaluation"
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="secondary" size="sm" onClick={() => setIsModifyModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSaveModification}>
              Save Adjustments
            </Button>
          </div>
        }
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="text-slate-300 font-semibold block mb-1">
              Capital Budget Allocation (₹ Cr):
            </label>
            <input
              type="number"
              value={adjustedBudget}
              onChange={(e) => setAdjustedBudget(Number(e.target.value))}
              className="w-full p-2 rounded bg-slate-950 border border-slate-700 text-white font-mono"
            />
            <span className="text-[10px] text-slate-500 mt-0.5 block">
              Default baseline: ₹{policy.estimatedCostCr} Cr
            </span>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">
              Implementation Horizon (Months):
            </label>
            <input
              type="number"
              value={adjustedMonths}
              onChange={(e) => setAdjustedMonths(Number(e.target.value))}
              className="w-full p-2 rounded bg-slate-950 border border-slate-700 text-white font-mono"
            />
            <span className="text-[10px] text-slate-500 mt-0.5 block">
              Default baseline: {policy.implementationTimeMonths} Months
            </span>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">
              Modification Rationale:
            </label>
            <textarea
              rows={2}
              value={modifyNotes}
              onChange={(e) => setModifyNotes(e.target.value)}
              placeholder="e.g., Phased rollout across first 20 colleges in Phase 1..."
              className="w-full p-2 rounded bg-slate-950 border border-slate-700 text-slate-200"
            />
          </div>
        </div>
      </Modal>

      {/* Reject Modal */}
      <Modal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        title={`Reject Recommendation: ${policy.id}`}
        description="Provide justification for returning this policy mandate to the intelligence model"
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="secondary" size="sm" onClick={() => setIsRejectModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleConfirmReject}>
              Confirm Rejection
            </Button>
          </div>
        }
      >
        <div className="space-y-3 text-xs">
          <p className="text-slate-300">
            Please record why {policy.title} cannot be executed at this time:
          </p>
          <textarea
            rows={3}
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="e.g., Capital constraints for FY2026-27 or overlapping central scheme..."
            className="w-full p-2.5 rounded bg-slate-950 border border-slate-700 text-slate-200"
          />
        </div>
      </Modal>
    </Card>
  );
};
