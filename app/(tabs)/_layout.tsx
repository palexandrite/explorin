import { Tabs } from "expo-router";
import React from "react";

import { Icon } from "@/components/Icon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
        screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            headerShown: false,
        }}
    >

        <Tabs.Screen
            name="index"
            options={{
                title: "Map",
                tabBarIcon: ({ color, focused }) => (
                    <Icon name={ focused ? "map-location-dot" : "map-location-dot" } color={ color } />
                ),
            }}
        />

        <Tabs.Screen
            name="quest"
            options={{
                title: "Quest",
                tabBarIcon: ({ color, focused }) => (
                    <Icon name={ focused ? "question" : "question" } color={ color } />
                ),
            }}
        />

        <Tabs.Screen 
            name="collection"
            options={{
                title: "Collection",
                tabBarIcon: ({ color, focused }) => (
                    <Icon name={ focused ? "building-columns" : "building-columns" } color={ color } />
                ),
            }}
        />

        <Tabs.Screen 
            name="profile"
            options={{
                title: "Profile",
                tabBarIcon: ({ color, focused }) => (
                    <Icon name={ focused ? "user-large" : "user-large" } color={ color } />
                ),
            }}
        />

    </Tabs>
  );
}
