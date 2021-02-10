-- CreateTable
CREATE TABLE "Team" (
"id" SERIAL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersInTeam" (
    "userId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,

    PRIMARY KEY ("userId","teamId")
);

-- AddForeignKey
ALTER TABLE "UsersInTeam" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersInTeam" ADD FOREIGN KEY("teamId")REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
