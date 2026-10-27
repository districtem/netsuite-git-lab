/**
 * Lab Demo Note - User Event
 * Logs one line on every save. Exists only to practice the deploy/test loop.
 *
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/log'], (log) => {
  const beforeSubmit = (ctx) => {
    const rec = ctx.newRecord;
    const body = String(rec.getValue({ fieldId: 'custrecord_lab_demo_note_body' }) || '');
    log.audit('lab_demo_ue', `beforeSubmit type=${ctx.type} id=${rec.id} bodyLen=${body.length}`);
  };
  return { beforeSubmit };
});
