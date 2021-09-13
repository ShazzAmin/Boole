/* global ace */
import "brace/ext/language_tools";

const words = [
  // checks
  "check ND",
  "check TP", 
  "check ST",
  "check PROP",
  "check Z",
  "check PC",
  "check NONE",

  // keywords
  "false",
  "true",

  // transformational
  "comm_assoc",	
  "contr",
  "lem",
  "impl",
  "contrapos",
  "simp1",
  "simp2",
  "distr",
  "dm",
  "neg",
  "equiv",
  "idemp",
  "forall_over_and",
  "exists_over_or",
  "swap_vars",
  "move_exists",
  "move_forall",

  // natural deduction
  "and_i",
  "and_e",
  "or_i",
  "or_e",
  "lem",
  "imp_e",
  "not_e",
  "not_not_i",
  "not_not_e",
  "iff_i",	
  "iff_e",
  "trans",
  "iff_mp",
  "exists_i",
  "forall_e",
  "eq_i",
  "eq_e",
  "disprove",
  "raa",
  "cases",
  "case",
  "assume",
  "imp_i",
  "forall_i",
  "for every",
  "for some",
  "exists_e",
  "premise",

  // semantic tableaux
  "and_nb",
  "not_and_br",
  "or_br",
  "not_or_nb",
  "imp_br",
  "not_imp_nb",
  "not_not_nb",
  "iff_br",	
  "not_iff_br",
  "forall_nb",
  "not_forall_nb",
  "exists_nb",
  "not_exists_nb",

  // predicate
  "forall",
  "exists",

  // arithmetic
  "equals",
  "arith",
  "inductionstep",
  "induction",

  // set
  "card()",
  "pow()",
  "dom()",
  "ran()",
  "inter",
  "union",
  "empty",
  "univ",
  "sub",
  "sube",
  "gen_U()",
  "gen_I()",
  "iter()",
  "id()",

  // Z spec
  "schema",
  "begin",
  "pred",
  "end"
];

ace.acequire("ace/ext/language_tools").addCompleter({
  getCompletions: (editor, session, pos, prefix, callback) => {
    callback(null, words.map((word) => {
      return {
        caption: word,
        value: word
      };
    }));
  }
});
