-- CreateTable
CREATE TABLE "User" (
"id" SERIAL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
"id" SERIAL,
    "userId" INTEGER NOT NULL,
    "picture" TEXT NOT NULL,
    "availability" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meeting" (
"id" SERIAL,
    "title" TEXT NOT NULL,
    "hostId" INTEGER NOT NULL,
    "timeslot" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "length" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersInMeeting" (
    "userId" INTEGER NOT NULL,
    "meetingId" INTEGER NOT NULL,

    PRIMARY KEY ("userId","meetingId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_unique" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Meeting.hostId_unique" ON "Meeting"("hostId");

-- AddForeignKey
ALTER TABLE "Profile" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meeting" ADD FOREIGN KEY("hostId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersInMeeting" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersInMeeting" ADD FOREIGN KEY("meetingId")REFERENCES "Meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;
