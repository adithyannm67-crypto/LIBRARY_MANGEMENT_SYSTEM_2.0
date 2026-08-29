"use client";

import React, { useId } from "react";
import clsx from "clsx";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import styles from "./Charts.module.css";

export interface ChartSeries {
  key: string;
  label: string;
  color: string;
}
export interface ChartDataPoint {
  [key: string]: string | number|undefined;
}

export interface ChartWrapperProps {
  title?: string;
  subtitle?: string;
  series?: ChartSeries[];
  children: React.ReactNode;
  className?: string;
}

export function ChartWrapper({
  title,
  subtitle,
  series,
  children,
  className,
}: ChartWrapperProps) {
  return (
    <div className={clsx(styles.root, className)}>
      {(title || series) && (
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            {title && <div className={styles.title}>{title}</div>}
            {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
          </div>
          {series && (
            <div className={styles.legend}>
              {series.map((s) => (
                <span key={s.key} className={styles.legendItem}>
                  <span
                    className={styles.legendDot}
                    style={{ background: s.color }}
                  />
                  {s.label}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
      <div className={styles.chart}>{children}</div>
    </div>
  );
}

function ChartTooltip({
  active,
  payload,
  label,
}: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.tooltip}>
      <div className={styles.tooltipLabel}>{label}</div>
      {payload.map((p) => (
        <div key={p.dataKey as string} className={styles.tooltipRow}>
          <span className={styles.tooltipName}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: p.color as string,
                display: "inline-block",
              }}
            />
            {p.name}
          </span>
          <span className={styles.tooltipValue}>
            {typeof p.value === "number" ? p.value.toLocaleString() : p.value}
          </span>
        </div>
      ))}
    </div>
  );
}

const AXIS_STYLE = {
  fontSize: 11,
  fill: "var(--muted-foreground)",
  fontFamily: "var(--font-family)",
};
const GRID_STYLE = { stroke: "var(--border)", strokeDasharray: "3 3" };

export interface AreaChartCardProps {
  data: ChartDataPoint[];
  series: ChartSeries[];
  xKey: string;
  height?: number;
  title?: string;
  subtitle?: string;
  className?: string;
}
export function AreaChartCard({
  data,
  series,
  xKey,
  height = 220,
  title,
  subtitle,
  className,
}: AreaChartCardProps) {
  const uid = useId().replace(/:/g, "");
  return (
    <ChartWrapper
      title={title}
      subtitle={subtitle}
      series={series}
      className={className}
    >
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart
          data={data}
          margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
        >
          <defs>
            {series.map((s) => (
              <linearGradient
                key={s.key}
                id={`grad-${uid}-${s.key}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={s.color} stopOpacity={0.2} />
                <stop offset="100%" stopColor={s.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid
            vertical={false}
            stroke="var(--border)"
            strokeDasharray="3 3"
          />
          <XAxis
            dataKey={xKey}
            tick={AXIS_STYLE}
            axisLine={false}
            tickLine={false}
          />
          <YAxis tick={AXIS_STYLE} axisLine={false} tickLine={false} />
          <Tooltip content={<ChartTooltip />} />
          {series.map((s) => (
            <Area
              key={`${uid}-${s.key}`}
              type="monotone"
              dataKey={s.key}
              name={s.label}
              stroke={s.color}
              strokeWidth={2}
              fill={`url(#grad-${uid}-${s.key})`}
              dot={false}
              activeDot={{ r: 4, fill: s.color }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}

export interface BarChartCardProps {
  data: ChartDataPoint[];
  series: ChartSeries[];
  xKey: string;
  height?: number;
  title?: string;
  subtitle?: string;
  stacked?: boolean;
  className?: string;
}
export function BarChartCard({
  data,
  series,
  xKey,
  height = 220,
  title,
  subtitle,
  stacked,
  className,
}: BarChartCardProps) {
  const uid = useId().replace(/:/g, "");
  return (
    <ChartWrapper
      title={title}
      subtitle={subtitle}
      series={series}
      className={className}
    >
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          id={uid}
          data={data}
          margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
          barGap={4}
          barCategoryGap="30%"
        >
          <CartesianGrid vertical={false} {...GRID_STYLE} />
          <XAxis
            dataKey={xKey}
            tick={AXIS_STYLE}
            axisLine={false}
            tickLine={false}
          />
          <YAxis tick={AXIS_STYLE} axisLine={false} tickLine={false} />
          <Tooltip
            content={<ChartTooltip />}
            cursor={{ fill: "var(--muted)", radius: 4 }}
          />
          {series.map((s) => (
            <Bar
              key={`${uid}-${s.key}`}
              dataKey={s.key}
              name={s.label}
              fill={s.color}
              radius={[4, 4, 0, 0]}
              stackId={stacked ? "stack" : undefined}
              maxBarSize={40}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}

export interface LineChartCardProps {
  data: ChartDataPoint[];
  series: ChartSeries[];
  xKey: string;
  height?: number;
  title?: string;
  subtitle?: string;
  className?: string;
}
export function LineChartCard({
  data,
  series,
  xKey,
  height = 220,
  title,
  subtitle,
  className,
}: LineChartCardProps) {
  const uid = useId().replace(/:/g, "");
  return (
    <ChartWrapper
      title={title}
      subtitle={subtitle}
      series={series}
      className={className}
    >
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          id={uid}
          data={data}
          margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
        >
          <CartesianGrid vertical={false} {...GRID_STYLE} />
          <XAxis
            dataKey={xKey}
            tick={AXIS_STYLE}
            axisLine={false}
            tickLine={false}
          />
          <YAxis tick={AXIS_STYLE} axisLine={false} tickLine={false} />
          <Tooltip content={<ChartTooltip />} />
          {series.map((s) => (
            <Line
              key={`${uid}-${s.key}`}
              type="monotone"
              dataKey={s.key}
              name={s.label}
              stroke={s.color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
