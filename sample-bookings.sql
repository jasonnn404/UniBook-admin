-- Sample Bookings for UniBook System
-- Run this in Supabase SQL Editor

-- Clear existing bookings first (optional)
-- DELETE FROM bookings;

-- Insert sample bookings for resources 1-8 with guest IDs 1 and 2

-- RESOURCE 1 - Study Room C
INSERT INTO bookings (created_at, startDate, endDate, numHours, numGuests, resourcePrice, totalPrice, status, observations, resourceId, guestId) VALUES
('2024-01-15T10:30:00Z', '2024-02-04T09:00:00Z', '2024-02-04T17:00:00Z', 8, 1, 200.00, 200.00, 'unconfirmed', 'Need quiet space for exam preparation', 1, 1),
('2024-01-02T14:15:00Z', '2024-01-12T10:00:00Z', '2024-01-12T18:00:00Z', 8, 2, 200.00, 200.00, 'checked-out', '', 1, 2);

-- RESOURCE 2 - Study Room A  
INSERT INTO bookings (created_at, startDate, endDate, numHours, numGuests, resourcePrice, totalPrice, status, observations, resourceId, guestId) VALUES
('2023-12-20T09:45:00Z', '2023-12-20T14:00:00Z', '2023-12-20T22:00:00Z', 8, 4, 240.00, 240.00, 'checked-out', 'Group project meeting', 2, 1),
('2024-01-23T16:20:00Z', '2024-02-18T09:00:00Z', '2024-02-18T17:00:00Z', 8, 3, 240.00, 240.00, 'unconfirmed', '', 2, 2);

-- RESOURCE 3 - Study Room B
INSERT INTO bookings (created_at, startDate, endDate, numHours, numGuests, resourcePrice, totalPrice, status, observations, resourceId, guestId) VALUES
('2023-11-30T11:10:00Z', '2024-01-10T10:00:00Z', '2024-01-10T18:00:00Z', 8, 2, 240.00, 240.00, 'checked-out', '', 3, 1),
('2024-01-23T13:30:00Z', '2024-01-23T09:00:00Z', '2024-01-23T17:00:00Z', 8, 1, 240.00, 240.00, 'checked-in', 'Individual study session', 3, 2);

-- RESOURCE 4 - Gym
INSERT INTO bookings (created_at, startDate, endDate, numHours, numGuests, resourcePrice, totalPrice, status, observations, resourceId, guestId) VALUES
('2024-01-05T08:00:00Z', '2024-01-31T06:00:00Z', '2024-01-31T14:00:00Z', 8, 3, 120.00, 120.00, 'checked-in', 'Fitness class with friends', 4, 1),
('2024-01-24T15:45:00Z', '2024-02-15T08:00:00Z', '2024-02-15T16:00:00Z', 8, 2, 120.00, 120.00, 'unconfirmed', '', 4, 2);

-- RESOURCE 5 - Meeting Room A
INSERT INTO bookings (created_at, startDate, endDate, numHours, numGuests, resourcePrice, totalPrice, status, observations, resourceId, guestId) VALUES
('2024-01-25T12:00:00Z', '2024-02-17T09:00:00Z', '2024-02-17T17:00:00Z', 8, 6, 400.00, 400.00, 'unconfirmed', 'Client presentation meeting', 5, 1),
('2024-01-19T10:15:00Z', '2024-01-19T09:00:00Z', '2024-01-19T17:00:00Z', 8, 4, 400.00, 400.00, 'checked-out', '', 5, 2);

-- RESOURCE 6 - Meeting Room B
INSERT INTO bookings (created_at, startDate, endDate, numHours, numGuests, resourcePrice, totalPrice, status, observations, resourceId, guestId) VALUES
('2024-01-22T14:30:00Z', '2024-01-25T09:00:00Z', '2024-01-25T17:00:00Z', 8, 8, 600.00, 600.00, 'checked-in', 'Team building workshop', 6, 1),
('2024-01-09T09:20:00Z', '2024-01-09T09:00:00Z', '2024-01-09T17:00:00Z', 8, 5, 600.00, 600.00, 'checked-out', 'Board meeting', 6, 2);

-- RESOURCE 7 - Party Room
INSERT INTO bookings (created_at, startDate, endDate, numHours, numGuests, resourcePrice, totalPrice, status, observations, resourceId, guestId) VALUES
('2024-01-23T16:45:00Z', '2024-02-20T18:00:00Z', '2024-02-20T22:00:00Z', 4, 15, 400.00, 400.00, 'unconfirmed', 'Birthday celebration', 7, 1),
('2024-01-18T11:30:00Z', '2024-02-15T18:00:00Z', '2024-02-15T22:00:00Z', 4, 20, 400.00, 400.00, 'unconfirmed', 'Graduation party', 7, 2);

-- RESOURCE 8 - Computer Lab
INSERT INTO bookings (created_at, startDate, endDate, numHours, numGuests, resourcePrice, totalPrice, status, observations, resourceId, guestId) VALUES
('2024-01-17T13:15:00Z', '2024-01-30T09:00:00Z', '2024-01-30T17:00:00Z', 8, 10, 280.00, 280.00, 'checked-in', 'Software development workshop', 8, 1),
('2024-01-25T08:45:00Z', '2024-01-25T09:00:00Z', '2024-01-25T17:00:00Z', 8, 8, 280.00, 280.00, 'checked-in', 'Data analysis project', 8, 2);

-- Verify the insertions
SELECT 
  b.id,
  b.created_at,
  b.startDate,
  b.endDate,
  b.numHours,
  b.numGuests,
  b.resourcePrice,
  b.totalPrice,
  b.status,
  b.observations,
  r.name as resource_name,
  g.fullName as guest_name
FROM bookings b
LEFT JOIN resources r ON b.resourceId = r.id
LEFT JOIN guests g ON b.guestId = g.id
ORDER BY b.created_at DESC; 