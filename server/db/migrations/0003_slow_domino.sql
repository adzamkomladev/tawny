CREATE TABLE "affiliate_applications" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(200) NOT NULL,
	"email" varchar(100) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"reason" varchar(500) NOT NULL,
	"accept_terms" boolean DEFAULT false NOT NULL,
	"status" varchar(30) DEFAULT 'pending' NOT NULL,
	"verification_code" varchar(10),
	"status_reason" varchar(300),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp (3)
);
