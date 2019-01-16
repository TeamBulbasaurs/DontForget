insert into "public"."Users" ("userName", "userEmail", "updatedAt") values ('Darryl Amour', 'darryl.amour@gmail.com', Now()); 
insert into "public"."Users" ("userName", "userEmail", "updatedAt") values ('Victor Wang', 'victor.wang@gmail.com', Now()); 
insert into "public"."Users" ("userName", "userEmail", "updatedAt") values ('Tony Hudgins', 'tony.hudgins@gmail.com', Now()); 

INSERT INTO "public"."Lists" ("listName", "notes") VALUES ('Ralphs', 'Dinner Party on Saturday');
INSERT INTO "public"."Lists" ("listName", "notes") VALUES ('Trader Joes', 'Family Brunch Sunday');

// VERIFY USERID AND LISTID SINCE DYNAMICALLY GENERATED
INSERT INTO "public"."ListGroup" ("listId", "userId") VALUES ('1', '2');
INSERT INTO "public"."ListGroup" ("listId", "userId") VALUES ('1', '3');

INSERT INTO "public"."Items" ("listId", "itemDescription", "quantity", "completed")
VALUES ('1', 'Eggs', '12', FALSE);
INSERT INTO "public"."Items" ("listId", "itemDescription", "quantity", "completed")
VALUES ('1', '9OZ T-Bone Steak', '50', FALSE);
INSERT INTO "public"."Items" ("listId", "itemDescription", "quantity", "completed")
VALUES ('1', 'A-1 Steak Sauce', '10', FALSE);