BEGIN;

CREATE TABLE public.tbl_todo (
	id text NOT NULL,
	name text,
	body text,
	iscompleted boolean DEFAULT false,
	completedby text,
	createdby text,
	updatedby text,
	dtcompleted timestamp without time zone,
	dtupdated timestamp without time zone,
	dtcreated timestamp without time zone DEFAULT timezone('utc'::text, now())
);

COMMIT;