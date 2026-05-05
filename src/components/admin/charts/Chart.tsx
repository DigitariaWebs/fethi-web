"use client";

import * as React from "react";
import {
  Area,
  AreaChart as RAreaChart,
  Bar,
  BarChart as RBarChart,
  CartesianGrid,
  Line,
  LineChart as RLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";
import { chartPalette, colors } from "@/lib/tokens";

const tickStyle = {
  fontSize: 11,
  fill: colors.n500,
  fontFamily: "var(--font-instrument-sans)",
};

const tooltipStyle: React.CSSProperties = {
  background: colors.surface,
  border: `1px solid ${colors.n200}`,
  borderRadius: 8,
  padding: "8px 10px",
  fontSize: 12,
  color: colors.ink,
  boxShadow: "0 8px 16px -4px rgba(31,36,33,0.08)",
};

type Series = { key: string; label?: string; color?: string };

export function LineChart({
  data,
  series,
  height = 220,
  xKey = "date",
  formatX,
  formatY,
}: {
  data: Record<string, unknown>[];
  series: Series[];
  height?: number;
  xKey?: string;
  formatX?: (v: string | number) => string;
  formatY?: (v: number) => string;
}) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <RLineChart data={data} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
          <CartesianGrid stroke={colors.n100} vertical={false} />
          <XAxis
            dataKey={xKey}
            tick={tickStyle}
            tickLine={false}
            axisLine={{ stroke: colors.n200 }}
            tickFormatter={formatX}
          />
          <YAxis
            tick={tickStyle}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatY}
            width={48}
          />
          <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: colors.n200 }} />
          {series.map((s, i) => (
            <Line
              key={s.key}
              dataKey={s.key}
              name={s.label ?? s.key}
              stroke={s.color ?? chartPalette[i % chartPalette.length]}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
              type="monotone"
            />
          ))}
        </RLineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AreaChart({
  data,
  series,
  height = 220,
  xKey = "date",
  formatX,
  formatY,
}: {
  data: Record<string, unknown>[];
  series: Series[];
  height?: number;
  xKey?: string;
  formatX?: (v: string | number) => string;
  formatY?: (v: number) => string;
}) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <RAreaChart data={data} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
          <defs>
            {series.map((s, i) => {
              const color = s.color ?? chartPalette[i % chartPalette.length];
              return (
                <linearGradient key={s.key} id={`fill-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.32} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.02} />
                </linearGradient>
              );
            })}
          </defs>
          <CartesianGrid stroke={colors.n100} vertical={false} />
          <XAxis
            dataKey={xKey}
            tick={tickStyle}
            tickLine={false}
            axisLine={{ stroke: colors.n200 }}
            tickFormatter={formatX}
          />
          <YAxis
            tick={tickStyle}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatY}
            width={48}
          />
          <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: colors.n200 }} />
          {series.map((s, i) => {
            const color = s.color ?? chartPalette[i % chartPalette.length];
            return (
              <Area
                key={s.key}
                dataKey={s.key}
                name={s.label ?? s.key}
                type="monotone"
                stroke={color}
                strokeWidth={2}
                fill={`url(#fill-${s.key})`}
              />
            );
          })}
        </RAreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BarChart({
  data,
  series,
  height = 220,
  xKey = "name",
  formatX,
  formatY,
  vertical,
}: {
  data: Record<string, unknown>[];
  series: Series[];
  height?: number;
  xKey?: string;
  formatX?: (v: string | number) => string;
  formatY?: (v: number) => string;
  vertical?: boolean;
}) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <RBarChart
          data={data}
          margin={{ top: 8, right: 8, left: -10, bottom: 0 }}
          layout={vertical ? "vertical" : "horizontal"}
        >
          <CartesianGrid stroke={colors.n100} vertical={vertical} horizontal={!vertical} />
          {vertical ? (
            <>
              <XAxis type="number" tick={tickStyle} tickLine={false} axisLine={false} tickFormatter={formatY} />
              <YAxis dataKey={xKey} type="category" tick={tickStyle} tickLine={false} axisLine={{ stroke: colors.n200 }} width={140} />
            </>
          ) : (
            <>
              <XAxis dataKey={xKey} tick={tickStyle} tickLine={false} axisLine={{ stroke: colors.n200 }} tickFormatter={formatX} />
              <YAxis tick={tickStyle} tickLine={false} axisLine={false} tickFormatter={formatY} width={48} />
            </>
          )}
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(31,36,33,0.04)" }} />
          {series.map((s, i) => (
            <Bar
              key={s.key}
              dataKey={s.key}
              name={s.label ?? s.key}
              fill={s.color ?? chartPalette[i % chartPalette.length]}
              radius={[4, 4, 0, 0]}
              barSize={vertical ? 14 : 18}
            />
          ))}
        </RBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function Sparkline({
  data,
  dataKey = "value",
  color = colors.primary,
  height = 36,
}: {
  data: Record<string, unknown>[];
  dataKey?: string;
  color?: string;
  height?: number;
}) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <RAreaChart data={data} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
          <defs>
            <linearGradient id={`sl-${dataKey}-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.32} />
              <stop offset="100%" stopColor={color} stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <Area
            dataKey={dataKey}
            type="monotone"
            stroke={color}
            strokeWidth={1.5}
            fill={`url(#sl-${dataKey}-${color.replace("#", "")})`}
          />
        </RAreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export { ReferenceLine };
