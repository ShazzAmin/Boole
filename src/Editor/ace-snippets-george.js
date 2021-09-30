/* global ace */

import "brace/ext/language_tools";

var snippets = [
    // natural deduction
    {
        caption: "assume",
        snippet: `assume $1 {\n\t?) \n}`,
    },
    {
        caption: "disprove",
        snippet: `disprove $1 {\n\t?) \n\t?) false by \n}`,
    },
    {
        caption: "case",
        snippet: `case $1 {\n\t?) \n}`,
    },
    // semantic tableaux
    {
        caption: "not_and_br",
        snippet: `not_and_br on $1 \n{\n\t?) !\n\tclosed on \n}\n{\n\t?) !\n\tclosed on \n}`,
    },
    {
        caption: "or_br",
        snippet: `or_br on $1 \n{\n\t?) \n\tclosed on \n}\n{\n\t?) \n\tclosed on \n}`,
    },
    {
        caption: "imp_br",
        snippet: `imp_br on $1 \n{\n\t?) !\n\tclosed on \n}\n{\n\t?) \n\tclosed on \n}`,
    },
    {
        caption: "iff_br",
        snippet: `iff_br on $1 \n{\n\t?) \n\tclosed on \n}\n{\n\t?) \n\tclosed on \n}`,
    },
    {
        caption: "not_iff_br",
        snippet: `not_iff_br on $1 \n{\n\t?) \n\tclosed on \n}\n{\n\t?) \n\tclosed on \n}`,
    },
];

ace.acequire("ace/ext/language_tools").addCompleter({
  getCompletions: (editor, session, pos, prefix, callback) => {
    snippets.forEach (i => {
        snippets.push({
            caption: i.caption,
            snippet: i.snippet,
            type: "snippet",
            score: 99
        })
      });
    callback(null, snippets);
  }
});
