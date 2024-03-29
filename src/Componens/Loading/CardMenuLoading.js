import { Card, Grid, Skeleton, Stack } from "@mui/material";
import React from "react";

export default function CardMenuLoading() {
  return (
    <Grid
      display={"flex"}
      flexWrap={"wrap"}
      gap={"42.7px"}
      // gap={5.2}
      marginTop={2}
      paddingBottom={3}
    >
      <Card
        elevation={0}
        sx={{
          width: 240,
          borderRadius: "20px",
          overflow: "hidden",
          padding: "10px",
        }}
      >
        <Stack spacing={1}>
          {/* For variant="text", adjust the height via font-size */}
          {/* For other variants, adjust the size with `width` and `height` */}
          <Skeleton
            variant="rectangular"
            sx={{ width: "100%", borderRadius: "10px" }}
            // width={210}
            height={120}
          />
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "200px" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100px" }} />
          <Skeleton
            variant="rounded"
            width={"100%"}
            height={35}
            sx={{ borderRadius: "8px" }}
          />
        </Stack>
      </Card>
      <Card
        elevation={0}
        sx={{
          width: 240,
          borderRadius: "20px",
          overflow: "hidden",
          padding: "10px",
        }}
      >
        <Stack spacing={1}>
          {/* For variant="text", adjust the height via font-size */}
          {/* For other variants, adjust the size with `width` and `height` */}
          <Skeleton
            variant="rectangular"
            sx={{ width: "100%", borderRadius: "10px" }}
            // width={210}
            height={120}
          />
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "200px" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100px" }} />
          <Skeleton
            variant="rounded"
            width={"100%"}
            height={35}
            sx={{ borderRadius: "8px" }}
          />
        </Stack>
      </Card>
      <Card
        elevation={0}
        sx={{
          width: 240,
          borderRadius: "20px",
          overflow: "hidden",
          padding: "10px",
        }}
      >
        <Stack spacing={1}>
          {/* For variant="text", adjust the height via font-size */}
          {/* For other variants, adjust the size with `width` and `height` */}
          <Skeleton
            variant="rectangular"
            sx={{ width: "100%", borderRadius: "10px" }}
            // width={210}
            height={120}
          />
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "200px" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100px" }} />
          <Skeleton
            variant="rounded"
            width={"100%"}
            height={35}
            sx={{ borderRadius: "8px" }}
          />
        </Stack>
      </Card>
      <Card
        elevation={0}
        sx={{
          width: 240,
          borderRadius: "20px",
          overflow: "hidden",
          padding: "10px",
        }}
      >
        <Stack spacing={1}>
          {/* For variant="text", adjust the height via font-size */}
          {/* For other variants, adjust the size with `width` and `height` */}
          <Skeleton
            variant="rectangular"
            sx={{ width: "100%", borderRadius: "10px" }}
            // width={210}
            height={120}
          />
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "200px" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100px" }} />
          <Skeleton
            variant="rounded"
            width={"100%"}
            height={35}
            sx={{ borderRadius: "8px" }}
          />
        </Stack>
      </Card>
      <Card
        elevation={0}
        sx={{
          width: 240,
          borderRadius: "20px",
          overflow: "hidden",
          padding: "10px",
        }}
      >
        <Stack spacing={1}>
          {/* For variant="text", adjust the height via font-size */}
          {/* For other variants, adjust the size with `width` and `height` */}
          <Skeleton
            variant="rectangular"
            sx={{ width: "100%", borderRadius: "10px" }}
            // width={210}
            height={120}
          />
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "200px" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100px" }} />
          <Skeleton
            variant="rounded"
            width={"100%"}
            height={35}
            sx={{ borderRadius: "8px" }}
          />
        </Stack>
      </Card>
    </Grid>
  );
}
