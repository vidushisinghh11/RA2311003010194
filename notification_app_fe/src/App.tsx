import React, { useEffect, useMemo, useState } from "react";

import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardContent,
  Grid,
  Tabs,
  Tab,
  Select,
  MenuItem,
  Box,
  Chip,
  Pagination,
} from "@mui/material";

const TOKEN = process.env.REACT_APP_ACCESS_TOKEN || "ADD_TOKEN_HERE";

type Notification = {
  ID: string;
  Type: "Event" | "Result" | "Placement";
  Message: string;
  Timestamp: string;
};

const weight = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export default function App() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [tab, setTab] = useState(0);
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [viewed, setViewed] = useState<string[]>([]);

  async function log(message: string) {
    try {
      await axios.post(
        "http://20.207.122.201/evaluation-service/logs",
        {
          stack: "frontend",
          level: "info",
          package: "component",
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchNotifications() {
  try {
    const res = await axios.get(
      "http://localhost:5000/notifications",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    console.log("FULL RESPONSE =", JSON.stringify(res.data, null, 2));

    const data =
      res.data.notifications ||
      res.data.data ||
      res.data ||
      [];

    setNotifications(Array.isArray(data) ? data : []);
  } catch (err) {
    console.log(err);
  }
}
  useEffect(() => {
    fetchNotifications();
  // eslint-disable-next-line
  }, []);

  const priorityNotifications = useMemo(() => {
    return [...notifications]
      .map((n) => ({
        ...n,
        score: weight[n.Type] * 1000000000000 + new Date(n.Timestamp).getTime(),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }, [notifications]);

  const list = tab === 0 ? notifications : priorityNotifications;
  const filtered =
    filter === "All" ? list : list.filter((n) => n.Type === filter);
  const paginated = filtered.slice((page - 1) * 10, page * 10);

  const markViewed = (id: string) => {
    if (!viewed.includes(id)) {
      setViewed((prev) => [...prev, id]);
      log(`notification viewed ${id}`);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Campus Notifications</Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label="All Notifications" />
          <Tab label="Priority Inbox" />
        </Tabs>

        <Box sx={{ my: 3 }}>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            size="small"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
          </Select>
        </Box>

        <Grid container spacing={2}>
          {paginated.map((n) => (
            <Grid size={{ xs: 12, md: 6 }} key={n.ID}>
              <Card
                onClick={() => markViewed(n.ID)}
                sx={{
                  cursor: "pointer",
                  background: viewed.includes(n.ID)
                    ? "#f5f5f5"
                    : "#e3f2fd",
                }}
              >
                <CardContent>
                  <Chip label={n.Type} sx={{ mb: 1 }} />
                  <Typography variant="h6">{n.Message}</Typography>
                  <Typography color="text.secondary">
                    {new Date(n.Timestamp).toLocaleString()}
                  </Typography>
                  {!viewed.includes(n.ID) && (
                    <Typography color="primary">New</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <Pagination
            count={Math.ceil(filtered.length / 10) || 1}
            page={page}
            onChange={(_, p) => setPage(p)}
          />
        </Box>
      </Container>
    </>
  );
}