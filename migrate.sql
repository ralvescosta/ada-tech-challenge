CREATE TABLE cards (
	id serial4 NOT NULL,
	title varchar(255) NOT NULL,
	"content" text NOT NULL,
	list varchar(255) NOT NULL,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	deleted_at timestamptz NULL,
	CONSTRAINT cards_pkey PRIMARY KEY (id)
);