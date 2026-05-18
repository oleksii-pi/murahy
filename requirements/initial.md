# requirements.md

## Project

One-page HTML/CSS/JavaScript ant colony strategy game.

## Goal

Create a simple but interesting RTS-style ant colony game where the player builds and manages an ant colony, gathers protein, grows ants, expands the anthill, and fights an AI colony.

## Technical Requirements

- Single-page app.
- Use only:
  - `index.html`
  - `style.css`
  - `script.js`
- No backend.
- No external frameworks.
- The game must run in a browser by opening `index.html`.

## Core Gameplay

The player controls an ant colony on a large forest map.

The colony has:

- 1 queen
- workers
- fighters
- larvae
- anthill storage
- construction materials
- food/protein resources

The player can select one or multiple units with the mouse and give orders, similar to StarCraft-style RTS controls.

## Map

- Large 2D top-down forest map.
- Food appears around the map.
- Enemy AI colony also exists on the same map.
- Anthills cannot be destroyed.
- Units can attack enemy units.

## Resources

Main resource: **protein**.

Food types:

- Beetle: 20% spawn chance, gives 10 protein.
- Fly: 30% spawn chance, gives 10 protein.
- Caterpillar: 40% spawn chance, gives 20 protein.

Construction materials:

- Sand
- Sticks

Workers can collect food, sand, and sticks and bring them to the anthill.

## Queen

There is only one queen in each colony.

Queen actions:

- Lay worker larvae.
- Lay fighter larvae.

Cost:

- 10 larvae cost 1 protein.

## Larvae Growth

Larvae require workers to feed them continuously.

Worker ant:

- Costs 1 protein to grow.
- Hatches after 30 seconds if fed.

Fighter ant:

- Costs 2 protein to grow.
- Hatches after 45 seconds if fed.

## Workers

Workers can:

- Attack.
- Collect beetles, flies, and caterpillars.
- Bring food to the anthill.
- Collect sand and sticks.
- Build and expand the anthill.
- Serve the queen by bringing food.
- Serve larvae by bringing food.
- Dig tunnels.
- Help found a new anthill.
- Attack enemy workers.

Combat:

- Worker kills enemy worker in 5 hits.
- Fighter kills worker in 3 hits.

## Fighters

Fighters can:

- Attack enemy workers.
- Attack enemy fighters.
- Defend the colony.
- Join attacks against enemy colony units.

Combat:

- Fighter kills worker in 3 hits.
- Fighter kills fighter in 10 hits.

## Anthill

The anthill stores:

- Protein
- Sand
- Sticks
- Larvae
- Workers
- Fighters

Workers can upgrade/expand the anthill using sand and sticks.

Anthill cannot be destroyed.

## Internal Workers

Some workers work inside the colony.

Internal worker roles:

- Serve queen.
- Feed larvae.

External workers gather resources and bring them to the central storage area in the anthill. Internal workers move food from storage to queen and larvae.

## Tunnels and New Anthills

Workers can dig underground tunnels.

Rules:

- Minimum 3 workers required.
- Maximum 10 workers can dig together.
- More workers means faster digging.
- After tunneling, workers can found a new anthill.

## Controls

- Mouse drag selects multiple units.
- Click selects one unit.
- Right click gives contextual command:
  - Move
  - Attack
  - Gather
  - Return to anthill
- Selected units show action buttons in the bottom-right UI.

Example worker actions:

1. Attack
2. Gather food
3. Gather sand/sticks
4. Bring resources to anthill
5. Build/expand anthill
6. Serve queen
7. Feed larvae
8. Dig tunnel

## AI Enemy Colony

At game start, AI creates its own anthill on the map.

AI behavior:

- Gather food.
- Grow workers.
- Grow fighters.
- Expand colony.
- Defend itself.
- When it has enough fighters, send an attack group toward the player colony.

Player can also attack AI units once they have enough fighters.

## Win/Loss Conditions

Simple version:

- Player wins by defeating enough enemy ants and surviving AI attacks.
- Player loses if queen dies.

Anthills cannot be destroyed.

## Gameplay Length

The game should last a long time and remain interesting.

Use:

- Slow but steady resource gathering.
- Larvae growth timers.
- AI attack waves.
- Colony expansion.
- Increasing need for workers and fighters.

## UI Requirements

Display:

- Protein amount
- Sand amount
- Sticks amount
- Number of workers
- Number of fighters
- Number of larvae
- Queen status
- Selected unit count
- Action buttons

Bottom-right panel:

- Shows actions available for selected units.

## Visual Style

- Simple 2D top-down style.
- Ants can be small circles/icons.
- Workers and fighters should look different.
- Queen should be larger.
- Food and materials should be visible on map.
- Anthills should be clearly visible.

## Implementation Notes

Use JavaScript game loop with:

- `requestAnimationFrame`
- Unit objects
- Resource objects
- Collision/distance checks
- Simple path movement
- Task/state system for units

Suggested unit states:

- idle
- moving
- gathering_food
- returning_food
- gathering_material
- returning_material
- building
- feeding_larvae
- serving_queen
- attacking
- digging

## Balance Values

Initial values may be adjusted during testing.

Starting player colony:

- 1 queen
- 5 workers
- 0 fighters
- 20 protein
- 0 sand
- 0 sticks

Starting AI colony:

- 1 queen
- 5 workers
- 0 fighters
- 20 protein

Resource values:

- Beetle: 10 protein
- Fly: 10 protein
- Caterpillar: 20 protein

Larvae:

- 10 larvae cost 1 protein
- Worker growth cost: 1 protein
- Fighter growth cost: 2 protein
- Worker hatch time: 30 seconds
- Fighter hatch time: 45 seconds

Combat:

- Worker vs worker: 5 hits to kill
- Fighter vs worker: 3 hits to kill
- Fighter vs fighter: 10 hits to kill

Tunnel:

- Minimum workers: 3
- Maximum workers: 10
- More workers = faster tunnel completion

## MVP Scope

The first working version must include:

- Map
- Player anthill
- AI anthill
- Queen
- Workers
- Fighters
- Food gathering
- Protein storage
- Larvae creation
- Larvae growth
- Unit selection
- Action buttons
- Simple combat
- AI colony growth
- AI attack waves

## Do Not Add Yet

Do not add complex features yet:

- Multiplayer
- Save/load
- Advanced pathfinding
- Complex animations
- Many resource types
- Building destruction
- Tech trees
- Multiple enemy species

Keep the game simple, playable, and expandable.
