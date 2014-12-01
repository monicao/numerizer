/* description: Parses end executes mathematical expressions. */
/* rm numerizer.js; jison -o numerizer.js --parser-type lalr english_grammar.jison; node numerizer.js input */

/* lexical grammar */
%lex
%%

\bone\b               return 'ONE'
\btwo\b               return 'TWO'
\bthree\b             return 'THREE'
\bhundred\b           return 'HUNDRED'
\bthousand\b          return 'THOUSAND'
\b[a-zA-Z]+ty\b       return 'TY'
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

s
    : s not_number { $$ = $1 + $2;}
    | s number { $$ = $1 + $2;}
    | not_number  { $$ = $1;}
    | number { $$ = $1;}
    | number WORD { $$ = $1 + $2;}
    ;

number
    : single_digit SP big_number SP AND SP single_digit { $$ = ($1 * $3) + $7; }
    | single_digit SP big_number SP WORD {$$ = ($1 * $3) + ' ' + $5;}
    | single_digit SP {{ $$= $1 + $2; }}
    | single_digit {{ $$= $1; }}
    | ty {{ $$ = $1; }}
    ;

not_number
    : SP WORD { $$ = $1 + $2;}
    | WORD SP { $$ = $1 + $2;}
    | SP AND  { $$ = $1 + $2;}
    | WORD {{ $$ = $1; }}
    | AND  {{ $$ = $1; }}
    | SP  {{ $$ = $1; }}
    ;

big_number
    : HUNDRED {$$ = 100;}
    | THOUSAND {$$ = 1000;}
    ;

ty
    : TY {$$ = 20;}
    ;

single_digit
    : ONE   {$$ = 1;}
    | TWO   {$$ = 2;}
    | THREE {$$ = 3;}
    ;
