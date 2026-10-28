/**
 * Lab Demo Notes - Suitelet
 * Lists Lab Demo Note records. Edit the title below, Upload File, refresh the page:
 * that's the single-file iteration loop.
 *
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/search', 'N/ui/serverWidget'], (search, ui) => {
  const TITLE = 'Lab Demo Notes (v2) Emily\'s Edit';

  const onRequest = (ctx) => {
    const form = ui.createForm({ title: TITLE });
    const list = form.addSublist({ id: 'custpage_notes', type: ui.SublistType.LIST, label: 'Notes' });
    list.addField({ id: 'custpage_id', type: ui.FieldType.TEXT, label: 'Internal ID' });
    list.addField({ id: 'custpage_name', type: ui.FieldType.TEXT, label: 'Name' });
    list.addField({ id: 'custpage_body', type: ui.FieldType.TEXT, label: 'Body' });

    let line = 0;
    search.create({
      type: 'customrecord_lab_demo_note',
      columns: ['internalid', 'name', 'custrecord_lab_demo_note_body']
    }).run().each((r) => {
      const body = String(r.getValue('custrecord_lab_demo_note_body') || '-').slice(0, 100);
      list.setSublistValue({ id: 'custpage_id', line, value: String(r.getValue('internalid')) });
      list.setSublistValue({ id: 'custpage_name', line, value: String(r.getValue('name') || '-') });
      list.setSublistValue({ id: 'custpage_body', line, value: body || '-' });
      line += 1;
      return line < 50;
    });

    ctx.response.writePage(form);
  };
  return { onRequest };
});
