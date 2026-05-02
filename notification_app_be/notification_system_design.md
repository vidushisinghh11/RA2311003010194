# Stage 1 - Notification System Design

## Problem
Build a campus notification prioritization system that displays the top 10 most important unread notifications.

Priority rule:
Placement > Result > Event

Within the same priority, more recent notifications rank higher.

## Approach

I used a weighted scoring mechanism:

- Placement = 3
- Result = 2
- Event = 1

Final score:

score = priority_weight + recency_timestamp

Notifications are:

1. fetched from API
2. mapped with score
3. sorted descending
4. top 10 returned

## Efficient Maintenance
For continuous incoming notifications:

Use:

- Max Heap / Priority Queue

Insertion complexity:

O(log n)

Top notification access:

O(1)

Top 10 retrieval:

O(10 log n)

This scales efficiently for large notification volumes.

## Logging Middleware Integration

Logs are created for:

- API fetch success
- sorting completion
- top 10 computation
- error handling

Example:

Log("backend","info","service","notifications fetched successfully")

## Output
System correctly prioritizes:

1. Placement notifications
2. Result notifications
3. Event notifications

while preserving recency ordering.

## Tech Stack

- TypeScript
- Node.js
- Axios
- Protected API Authentication