/* description: Parses end executes mathematical expressions. */
/* rm numerizer.js; jison -o numerizer.js --parser-type lalr english_grammar.jison; node numerizer.js input */

/* lexical grammar */
%lex
%%

\bone\b             return 'ONE'
\btwo\b               return 'TWO'
\bthree\b             return 'THREE'
\bhundred\b           return 'HUNDRED'
\bthousand\b          return 'THOUSAND'
ty\b                  return 'TY'
\band\b               return 'AND'
\b[a-zA-Z]+\b         return 'WORD'
<<EOF>>               return 'EOF'

/lex

/* operator associations and precedence */

%start foo

%% /* language grammar */

foo
    : s EOF { return $1.toString(); }
    ;

s   : single_digit { $$ = $1; }
    | not_number { $$ = $1; }
    ;

not_number
    : WORD { $$ = $1; }
    ;

big_number
    : HUNDRED {$$ = 100;}
    | THOUSAND {$$ = 1000;}
    ;

single_digit
    : ONE   {$$ = 1;}
    | TWO   {$$ = 2;}
    | THREE {$$ = 3;}
    ;
