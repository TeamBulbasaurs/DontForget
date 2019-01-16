CREATE TABLE "Users" (
	"userId" serial NOT NULL,
	"userName" TEXT NOT NULL,
	"userEmail" TEXT NOT NULL,
	"updatedAt" TIMESTAMP NOT NULL,
	CONSTRAINT Users_pk PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Lists" (
	"listId" serial NOT NULL UNIQUE,
	"listName" TEXT NOT NULL,
	"notes" TEXT NOT NULL,
	CONSTRAINT Lists_pk PRIMARY KEY ("listId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "ListGroup" (
	"id" serial NOT NULL,
	"listId" bigint NOT NULL,
	"userId" serial4 NOT NULL,
	CONSTRAINT ListGroup_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Items" (
	"itemId" bigserial NOT NULL,
	"listId" serial4 NOT NULL,
	"itemDescription" TEXT NOT NULL,
	"quantity" numeric NOT NULL,
	"completed" BOOLEAN NOT NULL,
	CONSTRAINT Items_pk PRIMARY KEY ("itemId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Session" (
	"userId" serial4 NOT NULL,
	"token" TEXT NOT NULL,
	"expirationDt" TIMESTAMP NOT NULL
) WITH (
  OIDS=FALSE
);





ALTER TABLE "ListGroup" ADD CONSTRAINT "ListGroup_fk0" FOREIGN KEY ("listId") REFERENCES "Lists"("listId");
ALTER TABLE "ListGroup" ADD CONSTRAINT "ListGroup_fk1" FOREIGN KEY ("userId") REFERENCES "Users"("userId");

ALTER TABLE "Items" ADD CONSTRAINT "Items_fk0" FOREIGN KEY ("listId") REFERENCES "Lists"("listId");

ALTER TABLE "Session" ADD CONSTRAINT "Session_fk0" FOREIGN KEY ("userId") REFERENCES "Users"("userId");

