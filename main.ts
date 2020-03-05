enum ActionKind {
    SlashRightWalk,
    SlashRightIdle,
    SlashRightWalkAtk,
    SlashRightIdleAtk,
    SlashRightJump,
    SlashRightJumpAtk,
    SlashRightClimb,
    SlashLeftWalk,
    SlashLeftIdle,
    SlashLeftWalkAtk,
    SlashLeftIdleAtk,
    SlashLeftJump,
    SlashLeftJumpAtk,
    SlashLeftClimb,
    Walking,
    Idle,
    Jumping,
    SoulLeftWalk,
    SoulLeftIdle,
    SoulLeftWalkAtk,
    SoulLeftIdleAtk,
    SoulLeftJump,
    SoulLeftJumpAtk,
    SoulRightWalk,
    SoulRightIdle,
    SoulRightWalkAtk,
    SoulRightIdleAtk,
    SoulRightJump,
    SoulRightJumpAtk
}
namespace SpriteKind {
    export const Warp = SpriteKind.create()
    export const Environment = SpriteKind.create()
    export const InteractivesTutorial = SpriteKind.create()
    export const Damage = SpriteKind.create()
    export const InteractiveFBLA = SpriteKind.create()
    export const InteractiveStory = SpriteKind.create()
    export const ToLevel = SpriteKind.create()
    export const Monster = SpriteKind.create()
    export const Points = SpriteKind.create()
    export const HeroProjectile = SpriteKind.create()
}
function SoulAnimation () {
    if (Move == true) {
        controller.moveSprite(HeroPlayer, 100, 0)
    } else {
        controller.moveSprite(HeroPlayer, 0, 0)
    }
    if (SoulActive == true && SoulActiveAtk == false) {
        if (LookRight == false && LookLeft == false) {
            animation.setAction(HeroPlayer, ActionKind.SoulRightIdle)
            if (LookRight == false && LookLeft == false && (HeroPlayer.vy < 0 || HeroPlayer.vy > 0)) {
                animation.setAction(HeroPlayer, ActionKind.SoulRightJump)
            }
        }
        if (LookRight == true) {
            animation.setAction(HeroPlayer, ActionKind.SoulRightIdle)
            if (LookRight == true && (HeroPlayer.vy < 0 || HeroPlayer.vy > 0)) {
                animation.setAction(HeroPlayer, ActionKind.SoulRightJump)
            }
        }
        if (LookLeft == true) {
            animation.setAction(HeroPlayer, ActionKind.SoulLeftIdle)
            if (LookLeft == true && (HeroPlayer.vy < 0 || HeroPlayer.vy > 0)) {
                animation.setAction(HeroPlayer, ActionKind.SoulLeftJump)
            }
        }
        if (HeroPlayer.vx > 0) {
            LookLeft = false
            LookUp = false
            LookDown = false
            LookRight = true
            animation.setAction(HeroPlayer, ActionKind.SoulRightWalk)
            if (LookRight == true && (HeroPlayer.vy < 0 || HeroPlayer.vy > 0)) {
                animation.setAction(HeroPlayer, ActionKind.SoulRightJump)
            }
        }
        if (HeroPlayer.vx < 0) {
            LookRight = false
            LookUp = false
            LookDown = false
            LookLeft = true
            animation.setAction(HeroPlayer, ActionKind.SoulLeftWalk)
            if (LookLeft == true && (HeroPlayer.vy < 0 || HeroPlayer.vy > 0)) {
                animation.setAction(HeroPlayer, ActionKind.SoulLeftJump)
            }
        }
    }
}
function BurstAnimation () {
    Move = false
    for (let index = 0; index < 100; index++) {
        HeroPlayer.startEffect(effects.bubbles, 1000)
    }
    pause(1500)
    Move = true
}
// Pressing Down will active FBLA tiles when player
//
//
// overlaps
sprites.onOverlap(SpriteKind.Player, SpriteKind.InteractiveFBLA, function (sprite, otherSprite) {
    if (HeroPlayer.overlapsWith(otherSprite)) {
        otherSprite.say("!", 500)
        if (controller.down.isPressed()) {
            if (NextLevel == 1) {
                game.showLongText("Future - Plan for the future", DialogLayout.Bottom)
            } else if (NextLevel == 2) {
                game.showLongText("Business - Be confident in your skills.", DialogLayout.Bottom)
            } else if (NextLevel == 3) {
                game.showLongText("Leaders - Be the one who makes the change. Be the influence.", DialogLayout.Bottom)
            } else if (NextLevel == 4) {
                game.showLongText("America - Change the world.", DialogLayout.Bottom)
            } else if (NextLevel == 5) {
                game.showLongText("5", DialogLayout.Bottom)
            }
        }
    } else {
    	
    }
})
// Pressing Down will active Tutorial tiles when
//
//
// player overlaps
sprites.onOverlap(SpriteKind.Player, SpriteKind.InteractivesTutorial, function (sprite, otherSprite) {
    if (HeroPlayer.overlapsWith(otherSprite)) {
        otherSprite.say("!", 500)
        if (controller.down.isPressed()) {
            if (NextLevel == 1) {
                game.showLongText("Soul can DOUBLE JUMP by double tapping \"UP\" while Slash can Climb WALLS by jumping THEN moving and holding.", DialogLayout.Bottom)
            } else if (NextLevel == 2) {
                game.showLongText("Lava will cause you to lose health, try to avoid it. There are coins present in these levels.", DialogLayout.Bottom)
            } else if (NextLevel == 3) {
                game.showLongText("3", DialogLayout.Bottom)
            } else if (NextLevel == 4) {
                game.showLongText("They are harmless.", DialogLayout.Bottom)
            }
        }
    } else {
    	
    }
})
// All the sprites that allow you to display text
function TextTiles () {
    for (let value22222 of scene.getTilesByType(4)) {
        TileTutorial = sprites.create(img`
. . . c c c c c c c c c c . . . 
. . c 1 1 1 6 6 6 6 1 1 1 c . . 
. c 1 1 6 6 6 6 6 6 6 6 1 1 c . 
. c 1 6 8 8 8 8 8 8 8 8 6 1 c . 
. c 6 8 8 8 8 8 8 8 8 8 8 6 c . 
. c 6 8 c c c c c c c c 8 6 c . 
c 8 8 c 1 6 6 6 6 6 6 1 c 8 8 c 
c 6 6 c 6 7 7 7 7 7 7 6 c 6 6 c 
c 6 6 c 1 6 6 6 6 6 6 1 c 6 6 c 
c 6 6 c 6 7 7 7 7 7 7 6 c 6 6 c 
c 6 6 c 1 6 6 6 6 6 6 1 c 6 6 c 
c 8 6 c 6 7 7 7 7 7 7 6 c 6 8 c 
f c 8 6 c c c c c c c c 6 8 c f 
f c 8 6 6 6 6 6 6 6 6 6 6 8 c f 
. f 8 6 6 6 f f f f c 6 6 8 f . 
. . f f f f . . . . f f f f . . 
`, SpriteKind.InteractivesTutorial)
        value22222.place(TileTutorial)
        TileTutorial.ay = 1000
    }
    for (let value223 of scene.getTilesByType(7)) {
        if (NextLevel == 5) {
            TileStory = sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, SpriteKind.InteractiveStory)
            // Idle Attack for Character "Shoot"
            animation.runImageAnimation(
            TileStory,
            [img`
. . . . . . . . . . . c . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . c c . . . . . . . . . . . . . . . . . . . 
. . . . . . c c f . c b c c c c c c c . . f . . . . . . . . . . 
. . . . . . c b f f b b b b b b b d d c f f . . . . . . . . . . 
. . . . . . . c f d f b b b b b b b b f d f . . 9 . . . . . . . 
. . . . . . c b f d 1 f b b c c c c c d b f . 9 1 9 . . . . . . 
. . . . . . c b b f d 1 f c 1 1 1 1 1 c f c . 6 1 6 . . . . . . 
. . . . . . c b d f d 1 f d 1 1 1 1 1 1 f c . 6 1 6 . . . . . . 
. . . . . . c b d b f d d 1 1 1 1 1 1 1 f c 8 9 1 9 8 . . . . . 
. . . . . . c b b b f d d 1 1 1 1 1 1 1 f c . 8 9 8 . . . . . . 
. . . . . . c b b b c d 1 1 f f 1 1 f f c . . . 8 . . . . . . . 
. . . . . . . c b c b c d 1 f f 1 1 f f c . . . 8 . . . . . . . 
. . . . . . . c b c b b c d f f d d f f c . . . 8 a . . . . . . 
. . . . . . c b b c d b c d 1 d d d d 1 c . . . 8 a . . . . . . 
. . . . . . . c b c d b c d 1 1 1 1 1 1 c . . . 8 a . . . . . . 
. . . . . . . . c b c d c d d 1 1 1 1 c . . . 8 a . . . . . . . 
. . . . . . . . c b c c f f f f f c c . . . . 8 a . . . . . . . 
. . . . . . . . c b b b f b b b f . . . . . f 8 a f . . . . . . 
. . . . . . . c b c f f b d d d d f f f f f d 8 a 8 f . . . . . 
. . . . . c c d b f b b d d d d d d f b d d d d a 8 f . . . . . 
. . . . c d d b b f d d d d f d d d f b d d d d a 8 f . . . . . 
. . . . . c b b f 1 d d d d f d d d f b b d d d a 8 f . . . . . 
. . . . . . c b f 1 d d d d f d d d f f b b d 8 a f . . . . . . 
. . . . . . . f 1 d d d d f b d d d f . f f f 8 a . . . . . . . 
. . . . . . f 1 d d d d d f b d d d f . . . . 8 a . . . . . . . 
. . . . . . f 1 1 d d d d f b d d d f . . . . 8 a . . . . . . . 
. . . . . . . f f 1 1 1 f b b d d d f . . . . . 8 a . . . . . . 
. . . . . . . f 1 f f f b b d d d d d f . . . . 8 a . . . . . . 
. . . . . . . . f b b b b d d d d d d d f . . . 8 a . . . . . . 
. . . . . . . f b b b b d d d d d d d d f . . . 8 . . . . . . . 
. . . . . . . f b b b d d d d d d d d d f . . . . . . . . . . . 
. . . . . . . f f f f f f f f f f f f f f . . . . . . . . . . . 
`,img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . c . . . . . . . . . . . . . . . . . . . 
. . . . . . c c . . . c c . . . . . . . . . . . . . . . . . . . 
. . . . . . c b f c c b b c c c c c c . . f . . . . . . . . . . 
. . . . . . c b f f b b b b b b d d d c f f . . 9 . . . . . . . 
. . . . . . . c f d f b b b b b b b b f d f . 9 1 9 . . . . . . 
. . . . . . c b f d 1 f b b c c c c c d b f . 6 1 6 . . . . . . 
. . . . . . c b b f d 1 f c 1 1 1 1 1 c f c . 6 1 6 . . . . . . 
. . . . . . c b b f d 1 f 1 1 1 1 1 1 1 f c 8 9 1 9 8 . . . . . 
. . . . . . c b d b f d 1 1 1 1 1 1 1 1 f c . 8 9 8 . . . . . . 
. . . . . . c b d b f d 1 1 1 1 1 1 1 1 f c . . 8 . . . . . . . 
. . . . . . c b b b c c d 1 f f 1 1 f f c . . . 8 . . . . . . . 
. . . . . . c b b b c b c d f f 1 1 f f c . . . 8 a . . . . . . 
. . . . . . . c b c b b c d f f d d f f c . . . 8 a . . . . . . 
. . . . . . c b b c b b c d 1 d d d d 1 c . . . 8 a . . . . . . 
. . . . . . . c b c d b c d 1 1 1 1 1 1 c . . 8 a . . . . . . . 
. . . . . . . . c b c d c d d 1 1 1 1 c . . . 8 a . . . . . . . 
. . . . . . . . c b b c f f f f f c c . . . . 8 a . . . . . . . 
. . . . . . . c b b f c f b b b b f f . . . f 8 a f . . . . . . 
. . . . . . c b b f b b b d d d d d f f f f d d a 8 f . . . . . 
. . . c c c d b b f d d d d d d d d f b d d d d a 8 f . . . . . 
. . . c d d b b f 1 d d d f d d d d f b d d d d a 8 f . . . . . 
. . . . c d b f 1 d d d d f d d d d f b b d d d a 8 f . . . . . 
. . . . . c f 1 d d d d d f d d d d f f b b d 8 a f . . . . . . 
. . . . . f 1 d d d d d f b d d d d f . f f f 8 a . . . . . . . 
. . . . . f 1 d d d d d f b d d d d d f . . . 8 a . . . . . . . 
. . . . . f f 1 1 1 d f b b d d d d d f . . . . 8 a . . . . . . 
. . . . . f 1 f f f f b b d d d d d d d f . . . 8 a . . . . . . 
. . . . . . f f b b b b d d d d d d d d d f . . 8 a . . . . . . 
. . . . . . f b b b b d d d d d d d d d d d f . 8 . . . . . . . 
. . . . . . f f f f f f f f f f f f f f f f f . . . . . . . . . 
`,img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . c . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . c c . . . . . . . . f . . . . . . . . . . 
. . . . . . c c f . c b c c c c c c c . . f . . 9 . . . . . . . 
. . . . . . c b f f b b b b b b b d d c f f . 9 1 9 . . . . . . 
. . . . . . . c f d f b b b b b b b b f d f . 6 1 6 . . . . . . 
. . . . . . c b f d 1 f b b c c c c c d b c . 6 1 6 . . . . . . 
. . . . . . c b b f d 1 f c 1 1 1 1 1 c f c 8 9 1 9 8 . . . . . 
. . . . . . c b d f d 1 f d 1 1 1 1 1 1 f c . 8 9 8 . . . . . . 
. . . . . . c b d b f d d 1 1 1 1 1 1 1 f c . . 8 . . . . . . . 
. . . . . . c b b b f d d 1 1 1 1 1 1 1 f . . . 8 . . . . . . . 
. . . . . . c b b b c d 1 1 f f 1 1 f f c . . . 8 a . . . . . . 
. . . . . . . c b c b c d 1 f f 1 1 f f c . . . 8 a . . . . . . 
. . . . . c c b b c b b c d f f d d f f c . . . 8 a . . . . . . 
. . . . . . c b b c d b c d 1 d d d d 1 c . . 8 a . . . . . . . 
. . . . . . . c b c d b c d 1 1 1 1 1 1 c . . 8 a . . . . . . . 
. . . . . . . . c b c d c d d 1 1 1 1 c . . . 8 a . . . . . . . 
. . . . . . . c b c f c c f f f f c c . . . f 8 a f . . . . . . 
. . . c . . c d b f b c b b b b b d f f f f d d a 8 f . . . . . 
. . . c c c d b b f d d d d f d d d f b d d d d a 8 f . . . . . 
. . . c d d b b f 1 d d d d f d d d f b d d d d a 8 f . . . . . 
. . . . c d d b f 1 d d d d f d d d f b b d d d a 8 f . . . . . 
. . . . . c c f 1 d d d d f b d d d f f b b d 8 a f . . . . . . 
. . . . . . f 1 d d d d d f b d d d f . f f f 8 a . . . . . . . 
. . . . . . f 1 1 d d d d f b d d d d f . . . 8 a . . . . . . . 
. . . . . . . f f 1 1 1 f b b d d d d f . . . . 8 a . . . . . . 
. . . . . . . f 1 f f f b b d d d d d d f . . . 8 a . . . . . . 
. . . . . . . . f b b b b d d d d d d d d f f . 8 a . . . . . . 
. . . . . . . f b b b b d d d d d d d d d d d f 8 . . . . . . . 
. . . . . . f f f f f f f f f f f f f f f f f f . . . . . . . . 
`,img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . c . . . . . . . . . . . . . . . . . . . 
. . . . . . c c . . . c c . . . . . . . . . . . . . . . . . . . 
. . . . . . c b f c c b b c c c c c c . . f . . . . . . . . . . 
. . . . . . c b f f b b b b b b d d d c f f . . 9 . . . . . . . 
. . . . . . . c f d f b b b b b b b b f d f . 9 1 9 . . . . . . 
. . . . . . c b f d 1 f b b c c c c c d b f . 6 1 6 . . . . . . 
. . . . . . c b b f d 1 f c 1 1 1 1 1 c f c . 6 1 6 . . . . . . 
. . . . . . c b b f d 1 f 1 1 1 1 1 1 1 f c 8 9 1 9 8 . . . . . 
. . . . . . c b d b f d 1 1 1 1 1 1 1 1 f c . 8 9 8 . . . . . . 
. . . . . . c b d b f d 1 1 1 1 1 1 1 1 f c . . 8 . . . . . . . 
. . . . . . c b b b c c d 1 f f 1 1 f f c . . . 8 . . . . . . . 
. . . . . . c b b b c b c d f f 1 1 f f c . . . 8 a . . . . . . 
. . . . . . . c b c b b c d f f d d f f c . . . 8 a . . . . . . 
. . . . . . c b b c b b c d 1 d d d d 1 c . . . 8 a . . . . . . 
. . . . . . . c b c d b c d 1 1 1 1 1 1 c . . 8 a . . . . . . . 
. . . . . . . . c b c d c d d 1 1 1 1 c . . . 8 a . . . . . . . 
. . . . . . . . c b b c f f f f f c c . . . . 8 a . . . . . . . 
. . . . . . . c b b f c f b b b b f f . . . f 8 a f . . . . . . 
. . . . . . c b b f b b b d d d d d f f f f d d a 8 f . . . . . 
. . . c c c d b b f d d d d d d d d f b d d d d a 8 f . . . . . 
. . . c d d b b f 1 d d d f d d d d f b d d d d a 8 f . . . . . 
. . . . c d b f 1 d d d d f d d d d f b b d d d a 8 f . . . . . 
. . . . . c f 1 d d d d d f d d d d f f b b d 8 a f . . . . . . 
. . . . . f 1 d d d d d f b d d d d f . f f f 8 a . . . . . . . 
. . . . . f 1 d d d d d f b d d d d d f . . . 8 a . . . . . . . 
. . . . . f f 1 1 1 d f b b d d d d d f . . . . 8 a . . . . . . 
. . . . . f 1 f f f f b b d d d d d d d f . . . 8 a . . . . . . 
. . . . . . f f b b b b d d d d d d d d d f . . 8 a . . . . . . 
. . . . . . f b b b b d d d d d d d d d d d f . 8 . . . . . . . 
. . . . . . f f f f f f f f f f f f f f f f f . . . . . . . . . 
`],
            200,
            true
            )
        } else {
            TileStory = sprites.create(img`
. . . c c c c c c c c c c . . . 
. . c 1 1 1 6 6 6 6 1 1 1 c . . 
. c 1 1 6 6 6 6 6 6 6 6 1 1 c . 
. c 1 6 8 8 8 8 8 8 8 8 6 1 c . 
. c 6 8 8 8 8 8 8 8 8 8 8 6 c . 
. c 6 8 c c c c c c c c 8 6 c . 
c 8 8 c 1 6 6 6 6 6 6 1 c 8 8 c 
c 6 6 c 6 9 9 9 9 9 9 6 c 6 6 c 
c 6 6 c 1 6 6 6 6 6 6 1 c 6 6 c 
c 6 6 c 6 9 9 9 9 9 9 6 c 6 6 c 
c 6 6 c 1 6 6 6 6 6 6 1 c 6 6 c 
c 8 6 c 6 9 9 9 9 9 9 6 c 6 8 c 
f c 8 6 c c c c c c c c 6 8 c f 
f c 8 6 6 6 6 6 6 6 6 6 6 8 c f 
. f 8 6 6 6 f f f f 6 6 6 8 f . 
. . f f f f . . . . f f f f . . 
`, SpriteKind.InteractiveStory)
        }
        value223.place(TileStory)
        TileStory.ay = 1000
    }
    for (let value224 of scene.getTilesByType(13)) {
        TilesFBLA = sprites.create(img`
. . . c c c c c c c c c c . . . 
. . c 1 1 1 6 6 6 6 1 1 1 c . . 
. c 1 1 6 6 6 6 6 6 6 6 1 1 c . 
. c 1 6 a a a a a a a a 6 1 c . 
. c 6 a a c c c c c c a a 6 c . 
. c 6 a c 2 2 2 2 2 2 c a 6 c . 
c a a c 1 8 8 8 8 8 8 1 c a a c 
c 6 6 c 1 2 2 2 2 2 2 1 c 6 6 c 
c 6 6 c 1 8 8 8 8 8 8 1 c 6 6 c 
c 6 6 c 1 2 2 2 2 2 2 1 c 6 6 c 
c 6 6 c 1 8 8 8 8 8 8 1 c 6 6 c 
c a 6 c 1 2 2 2 2 2 2 1 c 6 a c 
f c a 6 c 8 8 8 8 8 8 c 6 a c f 
f c a 6 6 c c c c c c 6 6 a c f 
. f a 6 6 6 f f f f 6 6 6 a f . 
. . f f f f . . . . f f f f . . 
`, SpriteKind.InteractiveFBLA)
        value224.place(TilesFBLA)
        TilesFBLA.ay = 1000
    }
}
// Activates all hero qualites
function hero () {
    HeroPlayer = sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, SpriteKind.Player)
    HeroPlayer.ay = 120
    scene.cameraFollowSprite(HeroPlayer)
    Move = true
    SlashActive = true
    SoulActive = false
    info.setLife(3)
    info.setScore(0)
    info.player2.setScore(100)
    SlashRightFace()
    SlashLeftFace()
    SoulRightFace()
    SoulLeftFace()
}
// All Tiles Images
function TileTypes () {
    scene.setBackgroundImage(img`
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 
`)
    // Points
    scene.setTile(14, img`
d d d d d d d d d d d d d d d d 
d d d 1 1 d d d d d d d d b d d 
d d d 1 1 d d d d d d d d d d d 
d d d d d d d d d d d d d d d d 
d d b d d d d d d b b d d d d d 
d d d d d d d d d b b d d d d d 
d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d 
d d d d d b d d d d d d d d d d 
d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d 
1 1 d d d d d d d d d d d d d d 
1 1 d d d d d d d d d d b d d d 
d d d d d d 1 d d d d d d d d d 
d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d b d 
`, false)
    // Environment Objects
    scene.setTile(10, img`
d d d d d d d d d d d d d d d d 
d d d 1 1 d d d d d d d d b d d 
d d d 1 1 d d d d d d d d d d d 
d d d d d d d d d d d d d d d d 
d d b d d d d d d b b d d d d d 
d d d d d d d d d b b d d d d d 
d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d 
d d d d d b d d d d d d d d d d 
d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d 
1 1 d d d d d d d d d d d d d d 
1 1 d d d d d d d d d d b d d d 
d d d d d d 1 d d d d d d d d d 
d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d b d 
`, false)
    // Background
    scene.setTile(1, img`
d d d d d d d d d d d d d d d d 
d d d 1 1 d d d d d d d d b d d 
d d d 1 1 d d d d d d d d d d d 
d d d d d d d d d d d d d d d d 
d d b d d d d d d b b d d d d d 
d d d d d d d d d b b d d d d d 
d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d 
d d d d d b d d d d d d d d d d 
d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d 
1 1 d d d d d d d d d d d d d d 
1 1 d d d d d d d d d d b d d d 
d d d d d d 1 d d d d d d d d d 
d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d b d 
`, false)
    // Out floor
    scene.setTile(15, img`
d d d d d d d d d d d d d d d d 
d d d 1 1 d d d d d d d d b d d 
d d d 1 1 d d d d d d d d d d d 
d d d d d d d d d d d d d d d d 
d d b d d d d d d b b d d d d d 
d d d d d d d d d b b d d d d d 
d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d 
d d d d d b d d d d d d d d d d 
d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d 
1 1 d d d d d d d d d d d d d d 
1 1 d d d d d d d d d d b d d d 
d d d d d d 1 d d d d d d d d d 
d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d b d 
`, false)
    // Story Text Tiles
    scene.setTile(7, img`
d d d d d d d d d d d d d d d d 
d d d 1 1 d d d d d d d d b d d 
d d d 1 1 d d d d d d d d d d d 
d d d d d d d d d d d d d d d d 
d d b d d d d d d b b d d d d d 
d d d d d d d d d b b d d d d d 
d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d 
d d d d d b d d d d d d d d d d 
d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d 
1 1 d d d d d d d d d d d d d d 
1 1 d d d d d d d d d d b d d d 
d d d d d d 1 d d d d d d d d d 
d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d b d 
`, false)
    // FBLA Text Tiles
    scene.setTile(13, img`
d d d d d d d d d d d d d d d d 
d d d 1 1 d d d d d d d d b d d 
d d d 1 1 d d d d d d d d d d d 
d d d d d d d d d d d d d d d d 
d d b d d d d d d b b d d d d d 
d d d d d d d d d b b d d d d d 
d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d 
d d d d d b d d d d d d d d d d 
d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d 
1 1 d d d d d d d d d d d d d d 
1 1 d d d d d d d d d d b d d d 
d d d d d d 1 d d d d d d d d d 
d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d b d 
`, false)
    // Tutorial Text Tiles
    scene.setTile(4, img`
d d d d d d d d d d d d d d d d 
d d d 1 1 d d d d d d d d b d d 
d d d 1 1 d d d d d d d d d d d 
d d d d d d d d d d d d d d d d 
d d b d d d d d d b b d d d d d 
d d d d d d d d d b b d d d d d 
d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d 
d d d d d b d d d d d d d d d d 
d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d 
1 1 d d d d d d d d d d d d d d 
1 1 d d d d d d d d d d b d d d 
d d d d d d 1 d d d d d d d d d 
d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d b d 
`, false)
    // Monster
    scene.setTile(2, img`
d d d d d d d d d d d d d d d d 
d d d 1 1 d d d d d d d d b d d 
d d d 1 1 d d d d d d d d d d d 
d d d d d d d d d d d d d d d d 
d d b d d d d d d b b d d d d d 
d d d d d d d d d b b d d d d d 
d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d 
d d d d d b d d d d d d d d d d 
d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d d d 
1 1 d d d d d d d d d d d d d d 
1 1 d d d d d d d d d d b d d d 
d d d d d d 1 d d d d d d d d d 
d d d d d d d d d d d d d d d d 
d d d d d d d d d d d d d d b d 
`, false)
    // Warps
    scene.setTile(8, img`
b b b b b b b b b b b b b b b b 
b b b 1 1 b b b b b b b b c b b 
b b b 1 1 b b b b b b b b b b b 
b b b b b b b b b b b b b b b b 
b b c b b b b b b c c b b b b b 
b b b b b b b b b c c b b b b b 
b b b b b b b b b b b b b b b b 
b b b b b b b b b b b b b b b b 
b b b b b c b b b b b b b b b b 
b b b b b b b b b b b b b b b b 
b b b b b b b b b b b b b b b b 
1 1 b b b b b b b b b b b b b b 
1 1 b b b b b b b b b b c b b b 
b b b b b b 1 b b b b b b b b b 
b b b b b b b b b b b b b b b b 
b b b b b b b b b b b b b b c b 
`, true)
    // Out floor
    scene.setTile(6, img`
c c c c c c c c c c c c c c c c 
c c a c c a c c a c c c c c c a 
f f c f c f a f f f f c a f c f 
c c f c a f c f c f c f c c c f 
c c c f f c f c c c f c f a f c 
c c c f c c c c c c c c c f c c 
c 1 1 c c c c c c c c c f c d c 
c c c c c c c c d d c c c c c c 
c c c 1 1 c c c d d c c c c c c 
c c c 1 1 c f c c c c c c c 1 c 
c c c c c c c c c c c c c c c c 
c c f c c c c c c c c f f c c c 
c c c c c c c c f c c f f c c c 
c c c d c c c c c c c c c c c c 
c c c c c c c 1 c c c c c c c c 
c c c c c c c c c c c c c c 1 c 
`, true)
    // In floor
    scene.setTile(9, img`
c c c c c c c c c c c c c c c c 
c c c 1 1 c c c c c c c c f c c 
c c c 1 1 c c d c c c c c c c c 
c c c c c c c c c c c c c c c c 
c c f c c c c c c f f c c c c c 
c c c c c c c c c f f c c c c c 
c c c c c c c c c c c c c c c c 
c d c c c c c c 1 c c c c c c c 
c c c c c f c c c c c c c c c c 
c c c c c c c c c c c c c 1 c c 
c c c c c c c c c c c c c c c c 
1 1 c c c c c c c c c c c c c c 
1 1 c c c c c c c c c c f c c c 
c c c c c c d c c c c c c c c c 
c c f c c c c c c c c c c c c c 
c c c c c c c c c c c c c c d c 
`, true)
    // Out Ceiling
    scene.setTile(11, img`
b b b b b b b b b b b b b b b b 
b c d b b b b b b d d b b b b c 
c b c d b b b b d c c b b b c b 
b b c d b b b d c b b b b d c b 
b b c d b b b d c b b b d c b b 
b b c d b b d c b b b b d c b b 
b b b c d b c b b b b d c b b b 
b b b c d c b b b b b d c b b b 
b b c b c d b b b b d c b b b b 
b c b b b c d b c c c b c c b b 
b c b b b c d c b b b b b b c b 
c b b b b c d c b b b b b b b c 
b c b b b b c b b c b b b b b b 
c . c c c b c b b c b b b c b b 
. . c . . c b c c . c b c . c c 
. . . . . . c . . . . c . . . . 
`, true)
    // In Ceiling
    scene.setTile(12, img`
b d d d d c d d d d d d d d d d 
d b b b b b c b b b b b b b b d 
d b b b b b c b b b b b c c c d 
d b b b c c b c b b c c c d d d 
d b b c b b b c b c c d d b b d 
d b c b b b b c b c d c b b b d 
d b c b b c c d c d b b c b b d 
d b b c c d d b b c b b c b b d 
d c c d d b b b b c b b c b b d 
c d d c b b b b c d c c b b b d 
d b b c b b b b c d b b c c b d 
d b b b c c b c d b b b b b c d 
d b b b b b c c d b b b b b b c 
d b b b b b c d b b b b b b b d 
d b b b b c c d b b b b b b b d 
d d d d d c d d d d d d d d d b 
`, true)
    // Floating 1
    scene.setTile(5, img`
c c c c c c c c c c c c c c c c 
c c a c c a c c a c c c c c c a 
f f c f c f a f f f f c a f c f 
c c f c a f c f c f c f c c c f 
d c c f f c f c c c f c f a f c 
c c c f b c c c c c c c c f c c 
c 1 1 c c c f c d d c c f c d c 
c c c c c c c c d d c c c c c c 
f c 1 1 c c c c c f f 1 c f f c 
. f 1 1 f c f c f . f c f . . f 
. f c f . f . f . . . f . . . . 
. . f . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, true)
    // Damage
    scene.setTile(3, img`
5 5 4 2 2 2 2 2 4 2 2 2 2 4 4 5 
5 4 2 2 2 2 2 4 4 4 4 4 4 4 5 5 
4 2 2 4 2 4 4 4 5 5 5 5 5 5 4 4 
2 2 2 2 4 4 5 5 4 4 4 5 4 5 4 4 
4 4 2 4 4 5 5 4 4 2 2 4 5 4 4 2 
4 4 2 4 5 4 4 2 2 2 2 4 5 4 4 2 
2 2 4 5 4 4 2 2 2 4 4 2 5 5 4 2 
4 4 5 5 4 2 2 2 2 4 4 2 4 5 5 4 
5 5 5 4 2 2 4 2 2 2 2 2 4 5 5 5 
4 5 4 4 2 2 2 2 2 2 2 2 4 5 4 4 
4 5 5 2 2 4 2 2 2 4 2 2 4 5 5 4 
5 5 4 2 4 2 4 2 2 2 2 4 5 5 5 5 
4 5 5 4 2 4 2 2 2 2 2 4 5 4 4 4 
4 5 5 5 2 2 2 4 4 4 5 5 5 4 2 2 
4 5 5 4 5 5 5 5 5 5 5 4 4 2 2 2 
4 5 5 4 4 4 4 4 4 4 4 2 2 2 4 4 
`, false)
    Environment2 = [img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . b b b b . . . 
. . . . . . b b b d d d d b . . 
. . . . . . b d d d d d d b . . 
. . . . b b d d d d d b b d . . 
. . . . b d d d d d d b b d b . 
. . . . c d d d d d b b d b c . 
. . . b c c b b b b d d b c c . 
. . b b c c c b d d b c c c c . 
. b b d d d b b b b b b c c c c 
. c d d d d d d b d b c c c b c 
. c b d d d b b d b c c c b b c 
c b c c c c b d d b b b b b c c 
c c b b b d d b c c b b b b c c 
c c c c c c c c c b b b b c c . 
. c c c c c c c c c c c c c . . 
`, img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . c c b b b . . . . . . 
. . . . c b d d d d b . . . . . 
. . . . c d d d d d d b b . . . 
. . . . c d d d d d d d d b . . 
. . . c b b d d d d d d d b . . 
. . . c b b d d d d d d d b . . 
. c c c c b b b b d d d b b b . 
. c d d b c b b b b b b b b d b 
c b b d d d b b b b b d d b d b 
c c b b d d d d d d d b b b d b 
c b c c c b b b d d d d d d b c 
c c b b b c c c b b b b b b c c 
. c c c c c c c c c c c c c c . 
`, img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . b b b . b b c . . b b b b . 
. b d d d b d d b c b b d d d b 
c b d d d c d d b b c d d d d b 
c c b b b b c b b c c b d b b b 
. c c c c c . c c c . c c c c c 
`, img`
. . . . . . . . . . . . . . . . f c . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . f c a f f . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . c f a a c f . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . c f a a a a c f . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f c a a a a a a c c . . . . . . . . . . . . . . 
. . . . . . . . . . . f c a a a a a a a c f . . . . . . . . . . . . . . 
. . . . . . . . . . . . f c c a a c a c f f f . . . . . . . . . . . . . 
. . . . . . . . . . . . f c c a c c a c a f . . . . . . . . . . . . . . 
. . . . . . . . . . . f c c c c c c c c c a c . . . . . . . . . . . . . 
. . . . . . . . . . c c a c c c c c c c a a a c . . . . . . . . . . . . 
. . . . . . . . . c a a c c a c c c a a c c f f . . . . . . . . . . . . 
. . . . . . . . f f c c c a c c a c a a c c a c f . . . . . . . . . . . 
. . . . . . . c a a c c a c c a a c a a c c c a a c . . . . . . . . . . 
. . . . . . c a a c c c c c a a a c c a a a a c a a c . . . . . . . . . 
. . . . . . . f c c a a a c a a c c c a a a a a c c f f . . . . . . . . 
. . . . . . f c c a a a c c c c c c a a a a a a a c a a c . . . . . . . 
. . . . . f c c c a a c c c c a a c a a a a c c c c c a a f . . . . . . 
. . . . f f c c c c c c a c a a a a a a c c c c a a c c c f . . . . . . 
. . . f c c c c c c c a a c a a c a a a c c c c a a a c c c f . . . . . 
. . . . f f c a a c c c c a a a c a a c c a a a c c c c c c f . . . . . 
. . . . f c a a c c a a c c c c c c c c c c a a a c c c c f . . . . . . 
. . f f c c c c c a a a c c a c c c c c c c c a a c c c c c f . . . . . 
. f c c c f c c c c a c c a c c a c a a c c c c c c a a c c c f . . . . 
. . f f f c c c c c c c c a c a a c a a c c c a a c c c c c c c f . . . 
. . . f c c c f c c c c c c c a a c a a a c c a a a c c c c c f f . . . 
. . . f c c f c c c c c c c c a a c c c a a c c c c c c c f f . . . . . 
. . . c c f f c c c c c c c c c c c c c a a a c c c c c c f . . . . . . 
. . . . f f c c c f c c c c c c c c c a a a a c c c c c c f . . . . . . 
. . . . . f c c f f c c c c c c c c c a c c c c c c f f f . . . . . . . 
. . . . . f c f f c c c f c c c c c c a c c c c c c f . . . . . . . . . 
. . . . . . f f f c c f c c c c c c c c c c c f c f . . . . . . . . . . 
. . . . . . . . f c f f c f c c c f c c f c c f f f . . . . . . . . . . 
. . . . . . . . f f f c c f c c f f c c f c f . . . . . . . . . . . . . 
. . . . . . . . . . f f f f f c f f f f f f . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . e f f e f f . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . e e e e . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . c e e f . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . c e e f . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . f e e f . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . c f c e e f . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . e c f f f c e e f c . . . . . . . . . . . . . . 
`, img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . c c c c . . . . . . 
. . . . . f c a a c f . . . . . 
. . . . f c a b a a c f . . . . 
. . c c f f c b b c f f c c . . 
c c c b b b c a b c b b a c c c 
c c a a a b a c a b b a a a a c 
. f f f c c a c c b a c f f c . 
c f c c c c c f f c c c c c f c 
c c a a a f f f f f f a a a c c 
c a a a c c f f f f c c a a a c 
f c f f c a c f f c a c f f c f 
. f f b b a c a a c a b b f f . 
. f c a b b c a a c b b a c f . 
. . f f f f f f f f f f f f . . 
`, img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . c c . . 
. . . . . . . . . . . c . . . . 
. . . . . . . . . . . c . . . . 
. . . . . . . . c . c . . . . . 
. . . . . . . c . . c . . . . . 
. . . c . . c . . . c . . . . . 
c . . . c . c . . . c . . c . . 
. c . . . c . . . . c . . c . . 
. c . . . c . . . . c . c . . . 
`, img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . 8 . . . . . 
. . . . . . . c . 8 9 8 . . . . 
. . 8 . . . c . . . 8 . . . . . 
. 8 9 8 . . c . . . c . . . . . 
. . 8 . . c . . . . . c . c . . 
. . c . . c . . c . . c . . c . 
c . . c . c . . c . . c . . c . 
`, img`
. . . . . . . . . . . . . . . c c c c . . . . . . . . . . . . . 
. . . . . . . . . . . . c c c c c a c c c c . . . . . . . . . . 
. . . . . . . . . . . c a a a a a c c a a c . . . . . . . . . . 
. . . . . . . . c c c c a a a a c c a a a c c c . . . . . . . . 
. . . . . . . c a a c c c c a a c a a c c c a a c c c . . . . . 
. . . . . . . c a a c a a c c c c a c c a a a c c a a c . . . . 
. . . . . c c c c c a a a a c c a a c a a c c c c c c . . . . . 
. . . c c c c a a c a a a a c a a a c c c a a a c a a c . . . . 
. . c c c c a a a c a a a c c a a a c c a a a a c a a c c . . . 
. . . c c c a a c a a c c a a a a a a a c c a a a c a c c c . . 
. . . f c a c c a a a c a a a a a a a a a a c a a a c c . . . . 
. . f f a a c c c c c a a a c c a a c a a a a c c c c c c f . . 
. . f f a c c c c c a a a c c c a a c c a a a a c c a a c f . . 
. . f c c c c a a c a a c c a c a a a c c c a a c c c a a c . . 
. . c c c c a a c c c c c a a c c a a c a a c c a c c c c c . . 
. . f f f a c c a a c a a a a a c c a c a a a c a a c f f f . . 
. . f f a a c c a a c a a a c a c a c c c a a c a a c c f f . . 
. . . c c c f c a c c c a c a c c a a c c c c c c c c f f . . . 
. . . f f f c c c a c c c c a c c a a c a a c c c f f f f . . . 
. . . . . f f f a a f c a c a a c c a c c a a c c c f f f . . . 
. . . . . f f c a c f a a c c a a c c c c c c f c c c f f . . . 
. . . . . . f c f f c a c f c a a f c c f c c c f f f . . . . . 
. . . . . . f f f f f c f c c c a f f c f f f c f f f . . . . . 
. . . . . . . . f f f f f c c c c f f f f f f f f . . . . . . . 
. . . . . . . . . f f . f f c f c f f f f . f f . . . . . . . . 
. . . . . . . . . . . . . f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . e e f e . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . e c f e . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . c f f e . . . . . . . . . . . . . 
. . . . . . . . . . . . . . f f c f e e . . . . . . . . . . . . 
. . . . . . . . . . . . . f c c e f f e . . . . . . . . . . . . 
. . . . . . . . . . . e f c e e e c c f e e . . . . . . . . . . 
`]
    Enviromental()
}
function SoulAtkAnimation () {
    if (SoulActive == true && SoulActiveAtk == true) {
        if (LookRight == false && LookLeft == false) {
            animation.setAction(HeroPlayer, ActionKind.SoulRightIdleAtk)
            if (LookRight == false && LookLeft == false && (HeroPlayer.vy < 0 || HeroPlayer.vy > 0)) {
                animation.setAction(HeroPlayer, ActionKind.SoulRightJumpAtk)
            }
        }
        if (LookRight == true) {
            animation.setAction(HeroPlayer, ActionKind.SoulRightIdleAtk)
            if (LookRight == true && (HeroPlayer.vy < 0 || HeroPlayer.vy > 0)) {
                animation.setAction(HeroPlayer, ActionKind.SoulRightJumpAtk)
            }
        }
        if (LookLeft == true) {
            animation.setAction(HeroPlayer, ActionKind.SoulLeftIdleAtk)
            if (LookLeft == true && (HeroPlayer.vy < 0 || HeroPlayer.vy > 0)) {
                animation.setAction(HeroPlayer, ActionKind.SoulLeftJumpAtk)
            }
        }
        if (HeroPlayer.vx > 0) {
            LookLeft = false
            LookUp = false
            LookDown = false
            LookRight = true
            animation.setAction(HeroPlayer, ActionKind.SoulRightWalkAtk)
            if (LookRight == true && (HeroPlayer.vy < 0 || HeroPlayer.vy > 0)) {
                animation.setAction(HeroPlayer, ActionKind.SoulRightJumpAtk)
            }
        }
        if (HeroPlayer.vx < 0) {
            LookRight = false
            LookUp = false
            LookDown = false
            LookLeft = true
            animation.setAction(HeroPlayer, ActionKind.SoulLeftWalkAtk)
            if (LookLeft == true && (HeroPlayer.vy < 0 || HeroPlayer.vy > 0)) {
                animation.setAction(HeroPlayer, ActionKind.SoulLeftJumpAtk)
            }
        }
    }
}
// The different Levels
function BuildMap () {
    Levels = [img`
c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c b b b b c c c c c c c c c c c c c c c 
c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c b b 1 1 1 1 c c c c c c c c c c c c c c c 
c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c b b b 1 1 1 1 1 1 b b c c c c c c c c c c c c c 
c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c b b 1 1 1 1 1 1 1 1 1 1 1 b b c c c c c c c c c c c 
c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b b c c c c c c c c c 
c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b b c c c c c c c 
c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c b b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b b c c c c c 
c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b b b c c 
c c c c c c c b b b b b b b b b b b c c c c c c c c c c c c c c c b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b c 
c c c c b b b 1 1 1 1 1 1 1 1 1 1 1 b b b c c c c c c c c c c b b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 
c c b b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b b b b b b b b b b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 
c b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 
b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 6 1 1 a 1 1 1 a a 1 a 1 1 1 1 1 a a 1 1 1 1 9 
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 6 1 1 1 8 1 1 d 1 1 1 a 1 1 1 1 1 1 1 1 1 9 
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 9 6 6 6 6 6 6 6 6 6 1 1 1 1 1 6 6 6 1 1 1 9 
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 9 9 9 9 9 9 9 9 9 6 6 1 1 6 9 9 9 1 1 1 9 
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 9 9 9 9 9 9 9 9 9 9 9 6 6 9 9 9 9 1 1 1 9 
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 a 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 1 1 1 9 
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 1 1 1 9 
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 a 1 1 1 1 1 1 1 6 6 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 1 1 1 9 
1 f 1 1 1 a a 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 9 1 1 1 6 6 1 1 1 a 1 1 1 1 1 1 1 1 1 1 9 9 9 9 9 9 9 9 9 9 9 9 9 1 1 1 9 
1 1 1 1 1 1 1 1 1 a 1 6 6 1 a 1 1 6 6 1 1 1 1 1 1 1 9 9 1 a 1 9 9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 9 9 9 9 9 9 9 9 9 9 9 1 1 1 9 
1 1 1 4 1 6 6 6 1 1 1 9 9 1 1 1 1 9 9 1 1 1 a 1 1 1 9 9 1 1 1 9 9 1 1 7 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 9 9 9 9 9 9 9 9 9 1 1 1 9 
6 6 6 6 6 9 9 9 6 6 6 9 9 6 6 6 6 9 9 1 1 a a a 1 1 9 9 6 6 6 9 9 6 6 6 6 6 1 1 1 1 1 1 1 1 1 1 1 1 1 9 9 9 9 9 9 9 9 9 1 1 1 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 6 1 1 1 1 1 6 9 9 9 9 9 9 9 9 9 9 9 9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 9 9 9 9 9 9 9 1 1 1 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 6 6 6 6 6 9 9 9 9 9 9 9 9 9 9 9 9 9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 9 9 9 9 9 9 9 1 1 1 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 9 9 9 9 9 1 1 1 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 1 a a 1 a 1 a 1 a 1 a a a 1 1 1 a 1 1 1 a a 1 1 1 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 9 
`, img`
9 c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c b b b b b b b b b b b b b b b b b b b b b b b b b b b b b c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c 
9 c c c c c c c c c c c c b b c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c b b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c 
9 c c c b b b c c c b b b 1 1 b b b c c b b b b c c c c c c c c c c c c c c c c c c c c c c c c b b b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b b c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c 
9 c c b 1 1 1 b b b 1 1 1 1 1 1 1 1 b b 1 1 1 1 b b b c c c c c c c c c c c c c c c c c c b b b 1 1 1 1 1 1 1 1 1 1 1 1 1 a a 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 e 1 1 1 1 1 b b c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c 
9 b b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b b b c c c c c c c c c c c c c c b 1 1 1 1 1 1 1 1 1 1 1 1 1 a a 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b b b b c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c 
9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b b c c c c c c c c c c c b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 c c 1 1 1 1 1 1 1 1 1 1 1 1 1 1 5 5 5 5 5 1 1 1 1 1 1 1 1 1 b b c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c 
9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b c c c c c c c c c c 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 c c c c c c 1 1 1 1 1 1 5 5 5 5 5 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c 
9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b c c c c c c c c c 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 c c c c c c 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b b c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c 
9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b c c c c c c c c 1 1 1 1 a a 1 1 1 1 1 1 1 1 1 c c c c c c 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b b b b c c c c c c c c c c c c c c c c c c c c c c c c c c c c 
9 1 1 1 1 f 1 1 1 . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 c c c c c c c c 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 c c c c c c 1 1 1 1 1 1 1 1 a 1 a 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b b b b b b b c c c c c c c c c c c c c c c c c c c c c 
9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 a a a 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 c c c c c c c c 1 1 8 1 1 d 1 1 1 1 1 1 1 1 1 c c c c c c c 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b c c c c c c c c c c c c c c c c c c c c 
9 1 1 1 1 1 1 4 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b c c c c c c c c c c c c c c c 3 3 3 3 3 3 3 c c c c c c c c c c 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b c c c c c c c c c c c c c c c c c c c 
9 6 6 6 6 6 6 6 6 3 3 3 3 3 3 6 6 6 6 6 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 c c c c c c c c c c c c c c c c c c 3 3 3 3 c c c c c c c c c c c c c 1 1 1 1 1 1 1 1 1 1 1 1 1 1 a a a 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b b b c c c c c c c c c c c c c c c c 
9 9 9 9 9 9 9 9 9 3 3 3 3 3 3 3 9 9 9 9 6 6 1 1 1 1 1 1 1 1 1 1 1 1 1 1 c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c 1 1 1 1 1 1 1 1 a a a 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b b c c c c c c c c c c c c c c 
9 9 9 9 9 9 9 9 9 6 6 3 3 3 3 6 9 9 9 9 9 9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 c c c c c c c c b c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b b b b b b b b b c c c c c 
9 9 9 9 9 9 9 9 9 9 9 6 3 3 6 9 9 9 9 9 9 9 6 1 1 1 1 1 1 1 1 1 1 1 1 1 c c c c c c b b 1 b b b b b b b b b b b b b b b b c c c c c c c c c c c c c c b 1 1 5 5 5 5 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 
9 9 9 9 9 9 9 9 9 9 9 9 6 6 9 9 9 9 9 9 9 9 9 6 1 1 1 1 1 1 1 1 1 1 1 c c c c c c c 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b c c c c c c c c c c c c c 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 a a 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 1 1 1 1 1 1 1 1 1 1 1 c c c b b b b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b b b b b b c c b b b b b 1 1 1 1 1 1 5 5 5 5 5 5 5 5 5 5 1 1 1 1 1 1 1 a 1 a 1 a 1 1 1 a 1 a 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 6 1 1 1 1 1 1 1 1 1 1 b b b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 a a a 1 a 1 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 6 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 a a 1 a 1 1 1 1 1 1 1 1 1 1 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 1 1 1 1 1 1 1 1 1 1 7 1 1 1 1 1 1 1 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 6 6 6 6 6 6 6 1 1 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 6 6 6 6 9 9 9 9 9 9 9 6 6 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 6 6 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 6 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 6 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 a 1 1 6 9 9 6 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 a a a 1 1 1 1 1 1 1 6 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 1 1 a a a 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 a 1 1 1 1 9 9 9 9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 a 1 1 1 1 1 1 1 1 1 1 1 6 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 6 9 9 9 9 6 1 1 1 1 1 1 1 1 1 1 a a 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 6 6 6 6 1 1 1 1 1 1 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 1 1 1 1 1 1 1 1 1 1 1 1 a a a 1 1 a a 1 1 1 1 1 1 1 1 1 6 6 6 6 9 9 9 9 9 9 1 1 1 1 1 1 1 1 1 1 a a 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 6 6 9 9 9 9 6 1 1 1 1 1 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 6 6 6 6 6 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 6 9 9 9 9 9 9 9 9 9 9 1 1 1 1 1 1 6 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 6 9 9 9 9 9 9 9 6 1 1 1 1 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 6 6 6 6 6 6 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 9 9 9 9 9 9 9 9 9 9 1 1 1 1 1 6 9 6 6 1 1 1 1 1 6 6 1 1 1 1 1 1 1 a a a a 1 1 1 1 1 1 9 9 9 9 9 9 9 9 9 3 3 3 3 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 6 6 6 6 6 1 1 1 1 1 1 1 1 1 1 1 1 9 9 9 9 9 9 9 9 9 9 1 1 1 1 1 9 9 9 9 6 6 6 6 6 9 9 6 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 9 9 9 9 9 9 9 9 3 3 3 6 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 6 6 6 6 1 1 1 1 1 1 1 6 9 9 9 9 9 9 9 9 9 9 1 1 1 1 1 9 9 9 9 9 9 9 9 9 9 9 9 1 1 1 1 1 1 6 6 6 6 6 1 1 1 1 1 9 9 9 9 9 9 9 9 9 3 3 3 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 3 3 3 3 3 3 3 9 9 9 9 9 9 9 9 9 9 9 1 1 1 1 1 9 9 9 9 9 9 9 9 9 9 9 9 1 1 1 1 1 6 9 9 9 9 9 6 1 1 1 1 9 9 9 9 9 9 9 9 9 3 3 3 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 6 6 3 3 3 3 3 9 9 9 9 9 9 9 9 9 9 9 3 3 3 3 3 9 9 9 9 9 9 9 9 9 9 9 9 3 3 3 3 3 9 9 9 9 9 9 9 1 1 1 1 9 9 9 9 9 9 9 9 9 3 3 3 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 3 3 3 3 6 9 9 9 9 9 9 9 9 9 9 9 3 3 3 3 3 9 9 9 9 9 9 9 9 9 9 9 9 3 3 3 3 6 9 9 9 9 9 9 9 1 1 1 1 9 9 9 9 9 9 9 9 9 3 3 3 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 6 3 3 3 9 9 9 9 9 9 9 9 9 9 9 9 3 3 3 3 3 9 9 9 9 9 9 9 9 9 9 9 9 3 3 3 3 3 9 9 9 9 9 9 9 1 1 1 6 9 9 9 9 9 9 9 9 9 6 3 3 3 6 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 3 3 3 9 9 9 9 9 9 9 9 9 9 9 9 3 3 3 3 3 9 9 9 9 9 9 9 9 9 9 9 9 3 3 3 3 6 9 9 9 9 9 9 9 1 1 1 9 9 9 9 9 9 9 9 9 9 9 6 6 6 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 3 3 3 3 9 9 9 9 9 9 9 9 9 9 9 3 3 3 3 6 9 9 9 9 9 9 9 9 9 9 9 9 3 3 3 3 9 9 9 9 9 9 9 9 6 6 6 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 3 3 3 3 9 9 9 9 9 9 9 9 9 9 9 6 6 6 6 9 9 9 9 9 9 9 9 9 9 9 9 9 6 6 6 6 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 6 6 6 6 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
`, img`
c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c 
c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c 
c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c b b b b b b c c c c c c c c c c c 
c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c b b b b 1 1 1 1 1 1 b c c c c c c c c c c 
c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c b b b b 1 1 1 1 1 1 1 1 1 1 1 b c c c c c c c c c 
c c c c c c c c c c c c c c c c c c c c c c c c c b b b c c c c c c c b b b b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b b c c c c c c c 
c c c c c c c c c c c b b b c c c c c c c c c c c 1 1 1 b c c b b b b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b b b b b b c 
c c c c c c c c c c b 1 1 1 b c b b c c c c c c c 1 1 1 1 b b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 c 
c c c c c c c b b b 1 1 1 1 1 b 1 1 c c c c c c c 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 
c c c c c b b 1 1 1 1 1 1 1 1 1 1 1 b c c c c c b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 a a 1 1 1 1 1 1 1 1 1 1 1 9 
c c c c b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 c c c c c 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 a a 1 1 1 1 1 1 1 1 7 1 1 1 1 1 9 
c c c c 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 c c c c c 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 a a 1 1 1 1 1 1 1 1 1 1 1 6 6 6 6 6 1 1 1 9 
c c c c 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b c c c c 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 6 6 6 6 6 9 9 9 9 9 1 1 1 9 
9 b c b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 c c c c 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 a 1 1 1 1 1 1 6 6 6 9 9 9 9 9 c c c c c 1 1 1 9 
9 1 b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 c c c b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 6 6 9 9 c c c c c c b b c c c 1 1 1 9 
9 1 1 1 1 1 1 1 1 1 1 a a 1 1 1 1 1 1 c c c c 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 6 6 6 9 9 c c c c c b b b 1 1 b b c 1 1 1 9 
9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 c c c b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 6 6 6 9 9 9 c c c c c b b 1 1 1 1 1 1 1 c 1 1 1 9 
9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 c c c b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 6 9 9 9 9 c c c c c b b 1 1 1 1 1 1 1 1 1 c 1 1 1 9 
9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 c c b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 9 9 9 9 c c c b b 1 1 1 1 1 1 1 1 1 1 1 c 1 1 1 9 
9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 8 1 1 c c 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 a 1 1 9 9 9 c c c c b 1 1 1 1 1 1 1 a 1 1 1 1 1 c 1 1 1 9 
9 1 1 1 1 1 1 1 1 1 1 1 d 1 6 6 6 6 c c 1 1 1 1 1 1 1 1 1 a 1 1 a 1 1 1 1 1 9 9 c c c b b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 c 1 1 1 9 
9 1 1 1 6 1 1 1 1 1 1 6 6 6 9 9 9 9 c b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 6 9 9 c c b 1 1 1 1 1 1 a 1 1 1 1 1 1 1 1 1 b 1 1 1 9 
9 1 1 1 9 6 1 1 1 1 6 9 9 9 9 9 9 c c 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 6 6 9 9 c c b 1 1 1 1 1 1 1 1 1 1 1 6 6 1 1 1 1 1 1 1 1 9 
9 1 1 1 9 9 1 1 1 1 9 9 9 9 9 9 c c c 1 1 1 1 1 1 1 1 1 1 1 1 1 6 6 6 9 9 9 c c c 1 1 1 1 1 1 1 1 1 1 6 6 9 9 6 1 1 1 1 a 1 1 9 
9 1 1 1 9 9 1 1 1 1 9 9 9 9 9 c c c b 1 1 1 1 1 1 1 1 1 1 1 1 6 9 9 9 9 9 9 c c c 1 1 1 1 1 1 1 1 6 6 9 9 9 9 9 6 1 1 1 1 1 1 9 
9 1 1 1 9 9 1 1 1 1 9 9 9 9 c c c c 1 1 1 1 1 1 1 1 1 1 1 6 6 9 9 9 9 9 9 c c c c 1 1 1 1 1 1 1 6 9 9 9 9 9 9 9 9 6 6 6 6 6 6 6 
9 1 1 1 9 9 1 1 1 1 9 9 c c c c c b 1 1 1 1 1 1 1 1 1 6 6 9 9 9 9 9 9 9 9 c c c c 1 1 1 1 1 1 1 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
9 1 1 1 9 9 1 1 1 1 9 9 c c c c c 1 1 1 1 1 1 1 6 6 6 9 9 9 9 9 9 9 9 9 c c c c c 1 1 1 1 1 6 6 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
9 1 1 1 9 9 1 1 1 1 9 c c c c c b 1 1 1 1 a 1 1 9 9 9 9 9 9 9 9 9 9 9 9 c c c c c 1 1 1 1 6 9 9 9 9 9 9 c c 9 9 c c c 9 9 9 9 9 
9 1 1 1 9 9 1 1 1 1 1 c c c c c 1 1 1 1 1 1 1 1 9 9 9 9 9 9 9 9 9 9 9 c c c c c c 1 1 1 1 c c 9 9 9 9 c c c c 9 c c c c c 9 9 9 
9 1 1 1 9 9 1 1 1 1 1 c c c c c 1 1 1 1 1 1 1 6 9 9 9 9 9 9 9 9 9 9 c c c c c c c 1 1 1 1 c c 9 9 9 c c c c c c c c c c c c c 9 
9 1 1 1 9 9 1 1 1 1 1 c c c c b 1 1 1 1 1 1 1 9 9 9 9 9 9 9 9 c c c c c c c c c c 1 1 1 1 c c c 9 c c c c c c c c c c c c c c c 
9 1 1 1 9 9 1 1 1 1 1 c c c c 1 1 1 1 1 1 1 1 9 9 9 9 9 9 c c c c c c c c c c c c 1 1 1 1 c c c c c c c c b b b b b b b c c c c 
9 1 1 1 9 9 1 1 1 1 1 c c c c 1 1 1 1 1 1 1 6 9 9 9 9 c c c c c c c c c c c c c c 1 1 1 1 c c c c c c b b 1 1 1 1 1 1 1 b c c c 
9 1 1 1 9 9 1 1 1 1 1 c c c c 1 1 1 a 1 1 1 9 9 9 c c c c c c c c c c c c c c c c 1 1 1 1 b c c c b b 1 1 1 1 1 1 1 1 1 1 b b c 
9 1 1 1 c 9 6 1 1 1 1 c c c c 1 1 1 1 1 1 1 9 c c c c c c c c c c c c c c c c c c 1 1 1 1 1 c c b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 c 
9 1 1 1 c 9 9 1 1 1 1 c c c b 1 1 1 1 1 1 6 c c c c c c c c c c c c c c c c c c c 1 1 1 1 1 b b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 
9 1 1 1 c 9 9 1 1 1 1 c c c 1 1 1 1 1 1 6 9 c c c c c c b b b c c c c c c c c c c 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 
9 1 1 1 c 9 9 1 1 1 1 b c c 1 1 1 1 1 1 9 9 c c c c b b 1 1 1 b b c c c c c c c c 6 1 1 a a 1 1 1 1 a a a 1 1 1 1 1 1 1 1 1 1 9 
9 1 1 1 c c 9 1 1 1 1 1 c b 1 1 1 1 1 6 9 c c b b b 1 1 1 1 1 1 1 b b c c c c c c c 6 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 
9 1 1 1 c c 9 1 1 1 1 1 c 1 1 a 1 1 6 9 9 c c 1 1 1 1 1 1 1 1 1 1 1 1 b c c c c c c c 6 6 6 6 6 6 6 6 6 6 6 6 1 1 1 1 1 1 1 1 9 
9 1 1 1 c c 9 1 1 1 1 1 b 1 1 1 1 1 9 9 9 c c 1 1 1 1 1 1 1 1 1 1 1 1 1 b c c c c c c c 9 9 9 9 9 9 9 9 9 9 9 6 1 1 1 1 1 1 1 9 
9 1 1 1 c c 9 6 1 1 1 1 1 1 1 1 1 6 9 9 c c c 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b b c c c c c c 9 9 9 9 9 9 9 9 9 9 9 6 6 1 1 1 1 1 9 
9 1 1 1 c c c 9 6 1 1 1 1 1 1 1 1 9 9 9 c c b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b c c c c c 9 9 9 9 9 9 9 9 9 9 9 9 9 1 1 1 1 1 9 
9 1 1 1 c c c c 9 6 1 1 a 1 1 6 6 9 9 c c c 1 1 e a 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b c c c c c c 9 9 9 9 9 9 9 9 9 9 9 1 1 1 1 1 9 
9 1 1 1 c c c c c 9 6 1 1 1 6 9 9 9 c c c c 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b b c c c c c 9 9 9 9 9 9 9 9 9 9 1 1 1 1 1 9 
9 1 1 1 b c c c c 9 9 6 6 6 9 9 c c c c c c 1 5 5 5 5 1 a a 1 1 1 1 1 1 1 1 1 1 1 1 1 b c c c c c 9 9 9 9 9 9 9 9 9 1 1 1 1 1 9 
9 1 1 1 1 c c c c c 9 9 9 9 9 c c c c c c c 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b c c c c c 9 9 9 9 9 9 9 9 1 1 1 1 1 9 
9 1 1 1 1 c c c c c c 9 9 9 c c b b b b b b 1 1 1 1 1 5 5 5 5 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b c c c c 9 9 9 9 9 9 9 9 1 1 1 1 1 9 
9 1 1 1 1 b c c b b c c c c c b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 a a a 1 1 1 1 1 1 1 1 1 b c c c c c 9 9 9 9 9 9 1 1 1 1 1 9 
9 1 1 1 1 1 b b 1 1 c c c b b 1 1 1 1 1 1 1 1 1 1 1 a 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b c c c c c c 9 9 9 9 9 1 1 1 1 1 9 
9 1 1 1 1 1 1 1 1 1 b c b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 5 5 5 5 5 5 1 1 1 1 1 1 1 1 1 b c c c c c c 9 9 9 9 1 1 1 1 1 9 
9 1 1 1 1 1 1 1 1 1 1 b 1 1 1 1 1 1 1 1 1 1 1 a 1 5 5 5 5 5 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b b c c c c c c 9 9 9 1 1 1 1 1 9 
9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b c c c c c c c c 9 1 1 1 1 1 9 
9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 5 5 5 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b c c c c c c c c c 1 1 1 1 1 9 
9 1 1 1 1 1 1 1 1 1 1 1 1 1 a a 1 a 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b c c c c c c c c 1 1 1 1 1 9 
9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 a 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b c c c c c c c c 1 1 1 1 1 9 
9 1 1 1 1 1 1 1 1 1 1 1 6 6 6 6 6 6 6 6 6 6 6 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b c c c c c c c 1 1 1 1 1 9 
9 1 1 f 1 1 1 1 1 1 6 6 9 9 9 9 9 9 9 9 9 9 9 6 6 6 6 6 6 6 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b c c c c c c c 1 1 1 1 1 9 
9 1 1 1 1 1 1 1 1 6 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 6 1 1 1 1 1 1 1 1 1 1 1 a 1 1 1 1 1 1 1 1 b b c c c c b 1 1 1 1 1 9 
9 1 1 1 1 1 1 6 6 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 1 1 a a 1 1 1 1 1 1 1 6 1 1 1 1 1 1 1 1 1 1 b b b b 1 1 1 1 1 1 9 
9 6 6 6 6 6 6 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 6 1 1 1 1 1 1 1 1 1 6 9 6 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 6 6 6 6 3 3 3 3 6 9 9 9 6 1 1 a 1 1 a 1 1 1 a 1 1 1 1 a 1 1 1 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 6 6 3 3 9 9 9 9 9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 6 6 9 9 9 9 9 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 9 
`, img`
c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c b b b b b b b b b b b b b b b b b b c 
c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c b b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 
c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c b b b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 
c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c b b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 
c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 
c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c b 1 1 1 1 1 1 1 a a a a a a a a a a a a a a 1 1 1 1 9 
c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c b b 1 1 1 1 1 8 1 1 d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 
c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c b 1 1 1 1 1 1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1 1 1 1 9 
c c c c c c c b b b b b b b b b b b c c c c c c c c c c c c c c c b 1 1 1 1 1 1 1 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 1 1 1 1 9 
c c c c b b b 1 1 1 1 1 1 1 1 1 1 1 b b b c c c c c c c c c c b b 1 1 1 1 1 1 1 1 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 1 1 1 1 9 
c c b b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b b b b b b b b b b 1 1 1 1 1 1 1 1 1 1 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 1 1 1 1 9 
c b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 1 1 1 1 9 
c 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 9 9 9 9 9 9 9 9 1 1 1 1 9 
9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 9 9 9 9 9 9 9 9 1 1 1 1 9 
9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 9 9 9 9 9 9 9 9 1 1 1 1 9 
9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 1 1 1 1 1 1 2 1 1 1 1 1 1 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 9 9 9 9 9 9 9 9 1 1 1 1 9 
9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 9 9 9 9 9 9 9 9 1 1 1 1 9 
9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 9 9 9 9 9 9 9 9 1 1 1 1 9 
9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 9 9 9 9 9 9 9 9 1 1 1 1 9 
9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 1 1 1 1 1 9 9 9 9 9 9 9 9 9 1 1 1 1 9 
9 1 1 1 1 1 1 a a a a 1 1 1 1 a a a a a a 1 1 1 1 a a a a a 1 1 1 1 a a a a 1 1 1 1 1 1 1 1 1 1 1 1 9 9 9 9 9 9 9 9 9 1 1 1 1 9 
9 1 1 f 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 9 9 9 9 9 9 9 9 1 1 1 1 9 
9 1 1 1 1 1 1 a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a 1 1 1 1 1 1 1 1 1 1 1 1 9 9 9 9 9 9 9 9 9 1 1 1 1 9 
9 1 1 1 1 4 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 9 9 9 9 9 9 9 9 1 1 1 1 9 
9 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 1 1 1 1 1 1 1 1 1 1 1 1 9 9 9 9 9 9 9 9 9 1 1 1 1 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 1 1 1 1 1 1 1 1 1 1 1 1 9 9 9 9 9 9 9 9 9 1 1 1 1 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 1 1 1 1 1 1 1 1 1 1 1 1 9 9 9 9 9 9 9 9 9 1 1 1 1 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 1 a a a 1 1 1 1 1 1 a a a a 1 1 1 1 1 1 a a a 1 1 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 1 a a a a a a a a a a a a a a a a a a a a a a 1 1 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 7 1 1 1 1 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 9 
`, img`
c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c 
c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c 
c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c 
c c c c c c c c c c c c c b b b b b b c c c c c c c c c c c c c 
c c c c c c c c c c c c b 1 1 1 1 1 1 b c c c c c c c c c c c c 
c c c c c c c c c c b b 1 1 1 1 1 1 1 1 b b c c c c c c c c c c 
c c c c c c b b b b 1 1 1 1 1 1 1 1 1 1 1 1 b b b b c c c c c c 
c c c c b b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b b c c c c 
c c c b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b c c c 
c c c 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 c c c 
c c b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b c c 
c c 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 c c 
c c 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 c c 
c c 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 c c 
c c 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 c c 
c b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b c 
c 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 c 
c 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 c 
9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 
9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 
9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 
9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 
9 1 1 1 1 1 1 1 1 1 a a a a a a a a a a a a 1 1 1 1 1 1 1 1 1 9 
9 1 1 1 1 1 1 1 1 1 a a a a a a a a a a a a 1 1 1 1 1 1 1 1 1 9 
9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 7 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 
9 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 9 
9 1 f 1 1 1 1 a a 1 1 1 1 1 1 1 1 1 1 1 1 1 1 a a 1 1 1 1 1 1 9 
9 1 1 1 a a 1 a a 1 1 1 1 1 1 1 1 1 1 1 1 1 1 a a 1 a a 1 1 1 9 
9 1 a 1 a a 1 1 1 1 6 6 6 6 6 6 6 6 6 6 6 6 1 1 1 1 a a 1 a 1 9 
9 1 a 1 1 1 1 6 6 6 9 9 9 9 9 9 9 9 9 9 9 9 6 6 6 1 1 1 1 a 1 9 
9 1 1 1 6 6 6 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 6 6 6 1 1 1 9 
9 6 6 6 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 6 6 6 9 
`]
    NextLevel = 0
    Music = true
}
function SoulAtk () {
    if (SoulActiveAtk == true) {
        if (LookLeft == true) {
            SoulAttack = sprites.createProjectileFromSprite(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . a a a . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . a c c c a . . . . . . . . . . . . . . . . . . . . . . 
. . . . a c c c c c a . . . . . . . . . . . . . . . . . . . . . 
. . . . a c c c c c a . . . . . . . . . . . . . . . . . . . . . 
. . . . a c c c c c a . . . . . . . . . . . . . . . . . . . . . 
. . . . . a c c c a . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . a a a . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
`, HeroPlayer, -50, 0)
            SoulAttack.setKind(SpriteKind.HeroProjectile)
        } else if (LookRight == true) {
            SoulAttack = sprites.createProjectileFromSprite(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . a a a . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . a c c c a . . . . . 
. . . . . . . . . . . . . . . . . . . . . a c c c c c a . . . . 
. . . . . . . . . . . . . . . . . . . . . a c c c c c a . . . . 
. . . . . . . . . . . . . . . . . . . . . a c c c c c a . . . . 
. . . . . . . . . . . . . . . . . . . . . . a c c c a . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . a a a . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
`, HeroPlayer, 50, 0)
            SoulAttack.setKind(SpriteKind.HeroProjectile)
        } else {
            SoulAttack = sprites.createProjectileFromSprite(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . a a a . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . a c c c a . . . . . 
. . . . . . . . . . . . . . . . . . . . . a c c c c c a . . . . 
. . . . . . . . . . . . . . . . . . . . . a c c c c c a . . . . 
. . . . . . . . . . . . . . . . . . . . . a c c c c c a . . . . 
. . . . . . . . . . . . . . . . . . . . . . a c c c a . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . a a a . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
`, HeroPlayer, 50, 0)
            SoulAttack.setKind(SpriteKind.HeroProjectile)
        }
    }
}
// Switch Between Characters
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (SlashActive == true) {
        BurstAnimation()
        SoulActive = true
        SlashActive = false
        SlashActiveAtk = false
        SoulActiveAtk = false
    } else if (SoulActive == true) {
        BurstAnimation()
        SlashActive = true
        SoulActive = false
        SlashActiveAtk = false
        SoulActiveAtk = false
    }
})
function SlashAnimation () {
    if (Move == true) {
        controller.moveSprite(HeroPlayer, 100, 0)
    } else {
        controller.moveSprite(HeroPlayer, 0, 0)
    }
    if (SlashActive == true && SlashActiveAtk == false) {
        if (LookRight == false && LookLeft == false) {
            animation.setAction(HeroPlayer, ActionKind.SlashRightIdle)
            if (LookRight == false && LookLeft == false && (HeroPlayer.vy < 0 || HeroPlayer.vy > 0)) {
                animation.setAction(HeroPlayer, ActionKind.SlashRightJump)
            }
        }
        if (LookRight == true) {
            animation.setAction(HeroPlayer, ActionKind.SlashRightIdle)
            if (LookRight == true && (HeroPlayer.vy < 0 || HeroPlayer.vy > 0)) {
                animation.setAction(HeroPlayer, ActionKind.SlashRightJump)
            }
        }
        if (LookLeft == true) {
            animation.setAction(HeroPlayer, ActionKind.SlashLeftIdle)
            if (LookLeft == true && (HeroPlayer.vy < 0 || HeroPlayer.vy > 0)) {
                animation.setAction(HeroPlayer, ActionKind.SlashLeftJump)
            }
        }
        if (HeroPlayer.vx > 0) {
            LookLeft = false
            LookUp = false
            LookDown = false
            LookRight = true
            animation.setAction(HeroPlayer, ActionKind.SlashRightWalk)
            if (LookRight == true && (HeroPlayer.vy < 0 || HeroPlayer.vy > 0)) {
                animation.setAction(HeroPlayer, ActionKind.SlashRightJump)
            }
        }
        if (HeroPlayer.vx < 0) {
            LookRight = false
            LookUp = false
            LookDown = false
            LookLeft = true
            animation.setAction(HeroPlayer, ActionKind.SlashLeftWalk)
            if (LookLeft == true && (HeroPlayer.vy < 0 || HeroPlayer.vy > 0)) {
                animation.setAction(HeroPlayer, ActionKind.SlashLeftJump)
            }
        }
    }
}
// Adds the environment to the map
function Enviromental () {
    for (let value2222 of scene.getTilesByType(10)) {
        EnvironmentChoose = Math.randomRange(0, 7)
        EnvironmentPlace = sprites.create(Environment2[EnvironmentChoose], SpriteKind.Environment)
        value2222.place(EnvironmentPlace)
        EnvironmentPlace.ay = 1000
    }
    for (let value2223 of scene.getTilesByType(3)) {
        Lava = sprites.create(img`
5 5 4 2 2 2 2 2 4 2 2 2 2 4 4 5 
5 4 2 2 2 2 2 4 4 4 4 4 4 4 5 5 
4 2 2 4 2 4 4 4 5 5 5 5 5 5 4 4 
2 2 2 2 4 4 5 5 4 4 4 5 4 5 4 4 
4 4 2 4 4 5 5 4 4 2 2 4 5 4 4 2 
4 4 2 4 5 4 4 2 2 2 2 4 5 4 4 2 
2 2 4 5 4 4 2 2 2 4 4 2 5 5 4 2 
4 4 5 5 4 2 2 2 2 4 4 2 4 5 5 4 
5 5 5 4 2 2 4 2 2 2 2 2 4 5 5 5 
4 5 4 4 2 2 2 2 2 2 2 2 4 5 4 4 
4 5 5 2 2 4 2 2 2 4 2 2 4 5 5 4 
5 5 4 2 4 2 4 2 2 2 2 4 5 5 5 5 
4 5 5 4 2 4 2 2 2 2 2 4 5 4 4 4 
4 5 5 5 2 2 2 4 4 4 5 5 5 4 2 2 
4 5 5 4 5 5 5 5 5 5 5 4 4 2 2 2 
4 5 5 4 4 4 4 4 4 4 4 2 2 2 4 4 
`, SpriteKind.Damage)
        value2223.place(Lava)
    }
    for (let value22232 of scene.getTilesByType(8)) {
        Gate = sprites.create(img`
. . . . . . . . . b b b b b b b b b b b b b b . . . . . . . . . 
. . . . . . . b b c c c c c c c c c c c c c c b b . . . . . . . 
. . . . . b b c c f f f f f f f f f f f f f f c c b b . . . . . 
. . . . b c c f f f f f f f f f f f f f f f f f f c c b . . . . 
. . . b c f f f f f f f f f f f f f f f f f f f f f f c b . . . 
. . b c f f f f f f f f f f f f f f f f f f f f f f f f c b . . 
. . b c f f f f f f f f f f f f f f f f f f f f f f f f c b . . 
. b c f f f f f f f f f f f f f f f f f f f f f f f f f f c b . 
. b c f f f f f f f f f f f f f f f f f f f f f f f f f f c b . 
b c f f f f f f f f f f f f f f f f f f f f f f f f f f f f c b 
b c f f f f f f f f f f f f f f f f f f f f f f f f f f f f c b 
b c f f f f f f f f f f f f f f f f f f f f f f f f f f f f c b 
b c f f f f f f f f f f f f f f f f f f f f f f f f f f f f c b 
b c f f f f f f f f f f f f f f f f f f f f f f f f f f f f c b 
b c f f f f f f f f f f f f f f f f f f f f f f f f f f f f c b 
b c f f f f f f f f f f f f f f f f f f f f f f f f f f f f c b 
b c f f f f f f f f f f f f f f f f f f f f f f f f f f f f c b 
b c f f f f f f f f f f f f f f f f f f f f f f f f f f f f c b 
b c f f f f f f f f f f f f f f f f f f f f f f f f f f f f c b 
b c f f f f f f f f f f f f f f f f f f f f f f f f f f f f c b 
b c f f f f f f f f f f f f f f f f f f f f f f f f f f f f c b 
b c f f f f f f f f f f f f f f f f f f f f f f f f f f f f c b 
b c f f f f f f f f f f f f f f f f f f f f f f f f f f f f c b 
b c f f f f f f f f f f f f f f f f f f f f f f f f f f f f c b 
. b c f f f f f f f f f f f f f f f f f f f f f f f f f f c b . 
. b c f f f f f f f f f f f f f f f f f f f f f f f f f f c b . 
. . b c f f f f f f f f f f f f f f f f f f f f f f f f c b . . 
. . b c f f f f f f f f f f f f f f f f f f f f f f f f c b . . 
. . . b c f f f f f f f f f f f f f f f f f f f f f f c b . . . 
. . . . b c c f f f f f f f f f f f f f f f f f f c c b . . . . 
. . . . . b b c c c c c c c c c c c c c c c c c c b b . . . . . 
. . . . . . . b b b b b b b b b b b b b b b b b b . . . . . . . 
`, SpriteKind.ToLevel)
        value22232.place(Gate)
        EnvironmentPlace.ay = 1000
    }
    for (let value22233 of scene.getTilesByType(14)) {
        PointsGain = sprites.create(img`
. . . . . . 6 6 6 6 6 6 6 . . . 
. . . . . . . 6 9 1 1 1 9 6 . . 
. . . . . . . . 6 1 1 1 1 9 6 . 
. . . . . . . . 6 9 9 1 1 1 6 . 
. . . . . . 6 6 6 9 9 9 1 1 6 . 
. . . 8 6 6 9 9 9 9 9 9 6 1 9 6 
. . 8 6 9 9 9 9 9 1 1 9 6 9 9 6 
. 8 6 9 9 6 6 6 1 1 1 9 6 9 9 6 
8 6 9 9 6 9 9 1 1 1 1 9 6 9 6 . 
8 6 9 9 6 9 1 1 1 1 9 9 6 9 6 . 
8 6 9 6 9 1 1 1 1 9 6 6 9 9 6 . 
8 6 9 6 9 1 1 1 9 6 9 9 9 6 . . 
8 6 9 9 6 6 6 6 6 9 9 9 9 6 . . 
. 8 6 9 9 9 9 9 9 9 6 6 6 . . . 
. . 8 6 6 6 6 6 6 6 8 8 . . . . 
. . . 8 8 8 8 8 8 8 . . . . . . 
`, SpriteKind.Points)
        value22233.place(PointsGain)
    }
}
function SlashAtk () {
    if (SlashActiveAtk == true) {
    	
    }
}
// Changes the levels when a certain tile is touched
scene.onHitTile(SpriteKind.Player, 8, function (sprite) {
    music.baDing.play()
    LevelNext()
})
// Switch Between Characters
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (SlashActive == true) {
        SlashActiveAtk = true
        SlashAtk()
        SlashAtkAnimation()
        pause(720)
        SlashActiveAtk = false
    } else if (SoulActive == true) {
        SoulActiveAtk = true
        SoulAtk()
        SoulAtkAnimation()
        pause(720)
        SoulActiveAtk = false
    }
})
function SlashAtkAnimation () {
    if (SlashActive == true && SlashActiveAtk == true) {
        if (LookRight == false && LookLeft == false) {
            animation.setAction(HeroPlayer, ActionKind.SlashRightIdleAtk)
            if (LookRight == false && LookLeft == false && (HeroPlayer.vy < 0 || HeroPlayer.vy > 0)) {
                animation.setAction(HeroPlayer, ActionKind.SlashRightJumpAtk)
            }
        }
        if (LookRight == true) {
            animation.setAction(HeroPlayer, ActionKind.SlashRightIdleAtk)
            if (LookRight == true && (HeroPlayer.vy < 0 || HeroPlayer.vy > 0)) {
                animation.setAction(HeroPlayer, ActionKind.SlashRightJumpAtk)
            }
        }
        if (LookLeft == true) {
            animation.setAction(HeroPlayer, ActionKind.SlashLeftIdleAtk)
            if (LookLeft == true && (HeroPlayer.vy < 0 || HeroPlayer.vy > 0)) {
                animation.setAction(HeroPlayer, ActionKind.SlashLeftJumpAtk)
            }
        }
        if (HeroPlayer.vx > 0) {
            LookLeft = false
            LookUp = false
            LookDown = false
            LookRight = true
            animation.setAction(HeroPlayer, ActionKind.SlashRightWalkAtk)
            if (LookRight == true && (HeroPlayer.vy < 0 || HeroPlayer.vy > 0)) {
                animation.setAction(HeroPlayer, ActionKind.SlashRightJumpAtk)
            }
        }
        if (HeroPlayer.vx < 0) {
            LookRight = false
            LookUp = false
            LookDown = false
            LookLeft = true
            animation.setAction(HeroPlayer, ActionKind.SlashLeftWalkAtk)
            if (LookLeft == true && (HeroPlayer.vy < 0 || HeroPlayer.vy > 0)) {
                animation.setAction(HeroPlayer, ActionKind.SlashLeftJumpAtk)
            }
        }
    }
}
function SoulRightFace () {
    SoulRightWalk = animation.createAnimation(ActionKind.SoulRightWalk, 166.66)
    animation.attachAnimation(HeroPlayer, SoulRightWalk)
    SoulRightWalk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . 8 . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . 8 8 . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . 8 8 a 8 8 8 8 8 8 8 . . . . . . . . . . . . . 
. . . . . . . . 8 a a a a a a a a 1 1 8 . . . . . . . . . . . . 
. . . . . . . 8 a a a a a a a f f f f 1 8 . . . . . . . . . . . 
. . . . . . 8 a a a 1 a a f f a a a a f f 8 . . . . . . . . . . 
. . . . . . 8 a a 1 a a f a a a 1 a a 8 a 8 . . . . . . . . . . 
. . . . . . 8 a 1 a a f 8 a a 1 a a 8 a 1 8 . . . . . . . . . . 
. . . . . . 8 a 1 a f 8 a a a a a 8 b 8 a 8 . . . . . . . . . . 
. . . . . . 8 a a a f 8 a a a a a 8 d b 8 8 . . . . . . . . . . 
. . . . . . 8 a a a 8 a a a 8 a 8 b f 1 b . . . . . . . . . . . 
. . . . . . . 8 a a 8 a a 8 a a 8 b f f b . . . . . . . . . . . 
. . . . . . . 8 a a 8 a a 8 a 8 b d f f b . . . . . . . . . . . 
. . . . . . . 8 a a 8 1 a 8 8 b d d d d b . . . . . . . . . . . 
. . . . . . . 8 a a 8 1 a 8 b d d d d d f . . . . . . . . . . . 
. . . . . . . . 8 a a 8 1 8 b d d d d f . . . . . . . . . . . . 
. . . . . . . . 8 a a 8 8 f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . 8 8 . 8 f f f c . . . . . . . . . . . . . . . 
. . . . . . . . . 8 c c c f f f f c . . . . . . . . . . . . . . 
. . . . . . . . . c f f f f f f f f c . . . . . . . . . . . . . 
. . . . . . . . . f f f f f c f f f c . . . . . . . . . . . . . 
. . . . . . . . f f f f f f c f f f f . . . . . . . . . . . . . 
. . . . . . . . f f f f f f c f f f f f . . . . . . . . . . . . 
. . . . . . . f f f f f f c f f f f f c f . . . . . . . . . . . 
. . . . . . f f f f f f f c f f f f f c f . . . . . . . . . . . 
. . . . . . f f f f f f f c f f f f f f . . . . . . . . . . . . 
. . . . . . . f f f f f c f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . c c c f f f f f f f f . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f f . . . . . . . . . . . 
. . . . . . . f f f f f f f f f f f f f f . . . . . . . . . . . 
. . . . . . . f f f f f f f f f f f f f f . . . . . . . . . . . 
`)
    SoulRightWalk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . 8 . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . 8 8 . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . 8 8 a a 8 8 8 8 8 8 . . . . . . . . . . . . . 
. . . . . . . . 8 a a a a a a a 1 1 1 8 . . . . . . . . . . . . 
. . . . . . . 8 a a a a a a a f f f f 1 8 . . . . . . . . . . . 
. . . . . . 8 a a a a a a f f a a a a f 1 8 . . . . . . . . . . 
. . . . . . 8 a a a 1 a f f a a a a a 8 f 8 . . . . . . . . . . 
. . . . . . 8 a a 1 a f 8 a a a 1 a 8 a a 8 . . . . . . . . . . 
. . . . . . 8 a 1 a f 8 a a a 1 a 8 b 8 1 8 . . . . . . . . . . 
. . . . . . 8 a 1 a 8 a a a a a a 8 d 8 8 . . . . . . . . . . . 
. . . . . . 8 a a a 8 a a a 8 a 8 b f 1 b . . . . . . . . . . . 
. . . . . . 8 a a a 8 a a 8 a a 8 b f f b . . . . . . . . . . . 
. . . . . . . 8 a 8 a a a 8 a 8 b d f f b . . . . . . . . . . . 
. . . . . . . 8 a 8 a a 8 8 8 b d d d d b . . . . . . . . . . . 
. . . . . . . 8 a 8 1 a 8 b b d d d d d f . . . . . . . . . . . 
. . . . . . . 8 a a 8 1 8 b d d d d d f . . . . . . . . . . . . 
. . . . . . . . 8 a a 8 f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . 8 c 8 f f f f c c . . . . . . . . . . . . . . 
. . . . . . . . . c f f f f f f f f c . . . . . . . . . . . . . 
. . . . . . . . f f f f f c f f f f c . . . . . . . . . . . . . 
. . . . . . . . f f f f f c f f f f f . . . . . . . . . . . . . 
. . . . . . . . c f f f f f c f f f f . . . . . . . . . . . . . 
. . . . . . . . c f f f f f c f f f f . . . . . . . . . . . . . 
. . . . . . . . c f f f f f f c f f f . . . . . . . . . . . . . 
. . . . . . . . . c f f f f f c f f f f . . . . . . . . . . . . 
. . . . . . . . . f c c c c c f f f f f f . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f f . . . . . . . . . . . 
. . . . . . . f f f f f f f f f f f f f f . . . . . . . . . . . 
. . . . . . f f f f f f f f f f f f f f f . . . . . . . . . . . 
`)
    SoulRightWalk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . 8 . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . 8 8 . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . 8 8 a 8 8 8 8 8 8 8 . . . . . . . . . . . . . 
. . . . . . . . 8 a a a a a a a a 1 1 8 . . . . . . . . . . . . 
. . . . . . . 8 a a a a a a a f f f f 1 8 . . . . . . . . . . . 
. . . . . . 8 a a a 1 a a f f a a a a f f 8 . . . . . . . . . . 
. . . . . . 8 a a 1 a a f a a a 1 a a 8 a 8 . . . . . . . . . . 
. . . . . . 8 a 1 a a f 8 a a 1 a a 8 a 1 8 . . . . . . . . . . 
. . . . . . 8 a 1 a f 8 a a a a a 8 b 8 a 8 . . . . . . . . . . 
. . . . . . 8 a a a f 8 a a a a a 8 d b 8 8 . . . . . . . . . . 
. . . . . . 8 a a a 8 a a a 8 a 8 b f 1 b . . . . . . . . . . . 
. . . . . . . 8 a a 8 a a 8 a a 8 b f f b . . . . . . . . . . . 
. . . . . . . 8 a a 8 a a 8 a 8 b d f f b . . . . . . . . . . . 
. . . . . . . 8 a a 8 1 a 8 8 b d d d d b . . . . . . . . . . . 
. . . . . . . 8 a a 8 1 a 8 b d d d d d f . . . . . . . . . . . 
. . . . . . . . 8 a a 8 1 8 b d d d d f . . . . . . . . . . . . 
. . . . . . . . 8 a a 8 8 f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . 8 8 . 8 f f f c . . . . . . . . . . . . . . . 
. . . . . . . . . 8 c c c f f f f c . . . . . . . . . . . . . . 
. . . . . . . . . c f f f f f f f f c . . . . . . . . . . . . . 
. . . . . . . . . f f f f f f f f f c . . . . . . . . . . . . . 
. . . . . . . . . f f f f f f c f f f . . . . . . . . . . . . . 
. . . . . . . . . f f f f f f f c f f . . . . . . . . . . . . . 
. . . . . . . . . f f f f f f f f c f f . . . . . . . . . . . . 
. . . . . . . . . c f f f f f f f c f f . . . . . . . . . . . . 
. . . . . . . . . . c f f f f f f c f . . . . . . . . . . . . . 
. . . . . . . . . f c f f f f f c f f . . . . . . . . . . . . . 
. . . . . . . . f f f c c c c c f f f . . . . . . . . . . . . . 
. . . . . . . f f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . f f f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . f f f f f f f f f f f f f f . . . . . . . . . . . . 
`)
    SoulRightWalk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . 8 . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . 8 8 . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . 8 8 a a 8 8 8 8 8 8 . . . . . . . . . . . . . 
. . . . . . . . 8 a a a a a a a 1 1 1 8 . . . . . . . . . . . . 
. . . . . . . 8 a a a a a a a f f f f 1 8 . . . . . . . . . . . 
. . . . . . 8 a a a a a a f f a a a a f 1 8 . . . . . . . . . . 
. . . . . . 8 a a a 1 a f f a a a a a 8 f 8 . . . . . . . . . . 
. . . . . . 8 a a 1 a f 8 a a a 1 a 8 a a 8 . . . . . . . . . . 
. . . . . . 8 a 1 a f 8 a a a 1 a 8 b 8 1 8 . . . . . . . . . . 
. . . . . . 8 a 1 a 8 a a a a a a 8 d 8 8 . . . . . . . . . . . 
. . . . . . 8 a a a 8 a a a 8 a 8 b f 1 b . . . . . . . . . . . 
. . . . . . 8 a a a 8 a a 8 a a 8 b f f b . . . . . . . . . . . 
. . . . . . . 8 a 8 a a a 8 a 8 b d f f b . . . . . . . . . . . 
. . . . . . . 8 a 8 a a 8 8 8 b d d d d b . . . . . . . . . . . 
. . . . . . . 8 a 8 1 a 8 b b d d d d d f . . . . . . . . . . . 
. . . . . . . 8 a a 8 1 8 b d d d d d f . . . . . . . . . . . . 
. . . . . . . . 8 a a 8 f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . 8 c 8 f f f f c c . . . . . . . . . . . . . . 
. . . . . . . . . c f f f f f f f f c . . . . . . . . . . . . . 
. . . . . . . . f f f f f c f f f f c . . . . . . . . . . . . . 
. . . . . . . . f f f f f c f f f f f . . . . . . . . . . . . . 
. . . . . . . . c f f f f f c f f f f . . . . . . . . . . . . . 
. . . . . . . . c f f f f f c f f f f . . . . . . . . . . . . . 
. . . . . . . . c f f f f f f c f f f . . . . . . . . . . . . . 
. . . . . . . . . c f f f f f c f f f f . . . . . . . . . . . . 
. . . . . . . . . f c c c c c f f f f f f . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f f . . . . . . . . . . . 
. . . . . . . f f f f f f f f f f f f f f . . . . . . . . . . . 
. . . . . . f f f f f f f f f f f f f f f . . . . . . . . . . . 
`)
    SoulRightIdle = animation.createAnimation(ActionKind.SoulRightIdle, 250)
    animation.attachAnimation(HeroPlayer, SoulRightIdle)
    SoulRightIdle.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . 8 . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . 8 8 . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . 8 8 a 8 8 8 8 8 8 8 . . . . . . . . . . . . . 
. . . . . . . . 8 a a a a a a a a 1 1 8 . . . . . . . . . . . . 
. . . . . . . 8 a a a a a a a f f f f 1 8 . . . . . . . . . . . 
. . . . . . 8 a a a 1 a a f f a a a a f f 8 . . . . . . . . . . 
. . . . . . 8 a a 1 a a f a a a 1 a a 8 a 8 . . . . . . . . . . 
. . . . . . 8 a 1 a a f 8 a a 1 a a 8 a 1 8 . . . . . . . . . . 
. . . . . . 8 a 1 a f 8 a a a a a 8 b 8 a 8 . . . . . . . . . . 
. . . . . . 8 a a a f 8 a a a a a 8 d b 8 8 . . . . . . . . . . 
. . . . . . 8 a a a 8 a a a 8 a 8 b f 1 b . . . . . . . . . . . 
. . . . . . . 8 a a 8 a a 8 a a 8 b f f b . . . . . . . . . . . 
. . . . . . . 8 a a 8 a a 8 a 8 b d f f b . . . . . . . . . . . 
. . . . . . . 8 a a 8 1 a 8 8 b d d d d b . . . . . . . . . . . 
. . . . . . . 8 a a 8 1 a 8 b d d d d d f . . . . . . . . . . . 
. . . . . . . . 8 a a 8 1 8 b d d d d f . . . . . . . . . . . . 
. . . . . . . . 8 a a 8 8 f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . 8 8 . 8 f f f c . . . . . . . . . . . . . . . 
. . . . . . . . . 8 c c c f f f f c . . . . . . . . . . . . . . 
. . . . . . . . . c f f f f f f f f c . . . . . . . . . . . . . 
. . . . . . . . . f f f f f c f f f c . . . . . . . . . . . . . 
. . . . . . . . f f f f f f c f f f f . . . . . . . . . . . . . 
. . . . . . . . f f f f f f c f f f f f . . . . . . . . . . . . 
. . . . . . . f f f f f f c f f f f f c f . . . . . . . . . . . 
. . . . . . f f f f f f f c f f f f f c f . . . . . . . . . . . 
. . . . . . f f f f f f f c f f f f f f . . . . . . . . . . . . 
. . . . . . . f f f f f c f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . c c c f f f f f f f f . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f f . . . . . . . . . . . 
. . . . . . . f f f f f f f f f f f f f f . . . . . . . . . . . 
. . . . . . . f f f f f f f f f f f f f f . . . . . . . . . . . 
`)
    SoulRightIdle.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . 8 . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . 8 8 . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . 8 8 a a 8 8 8 8 8 8 . . . . . . . . . . . . . 
. . . . . . . . 8 a a a a a a a 1 1 1 8 . . . . . . . . . . . . 
. . . . . . . 8 a a a a a a a f f f f 1 8 . . . . . . . . . . . 
. . . . . . 8 a a a a a a f f a a a a f 1 8 . . . . . . . . . . 
. . . . . . 8 a a a 1 a f f a a a a a 8 f 8 . . . . . . . . . . 
. . . . . . 8 a a 1 a f 8 a a a 1 a 8 a a 8 . . . . . . . . . . 
. . . . . . 8 a 1 a f 8 a a a 1 a 8 b 8 1 8 . . . . . . . . . . 
. . . . . . 8 a 1 a 8 a a a a a a 8 d 8 8 . . . . . . . . . . . 
. . . . . . 8 a a a 8 a a a 8 a 8 b f 1 b . . . . . . . . . . . 
. . . . . . 8 a a a 8 a a 8 a a 8 b f f b . . . . . . . . . . . 
. . . . . . . 8 a 8 a a a 8 a 8 b d f f b . . . . . . . . . . . 
. . . . . . . 8 a 8 a a 8 8 8 b d d d d b . . . . . . . . . . . 
. . . . . . . 8 a 8 1 a 8 b b d d d d d f . . . . . . . . . . . 
. . . . . . . 8 a a 8 1 8 b d d d d d f . . . . . . . . . . . . 
. . . . . . . . 8 a a 8 f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . 8 c 8 f f f f c c . . . . . . . . . . . . . . 
. . . . . . . . . c f f f f f f f f c . . . . . . . . . . . . . 
. . . . . . . . . f f f f f f f f f c . . . . . . . . . . . . . 
. . . . . . . . f f f f f c f f f f f . . . . . . . . . . . . . 
. . . . . . . f f f f f f c f f f f f . . . . . . . . . . . . . 
. . . . . . f f f f f f f c f f f f f f . . . . . . . . . . . . 
. . . . . f f f f f f f c f f f f f f c f . . . . . . . . . . . 
. . . . . f f f f f f f c f f f f f f c f . . . . . . . . . . . 
. . . . . . f f f f f c f f f f f f f f . . . . . . . . . . . . 
. . . . . . . c c c c f f f f f f f f f f . . . . . . . . . . . 
. . . . . . . f f f f f f f f f f f f f f . . . . . . . . . . . 
. . . . . . f f f f f f f f f f f f f f f f . . . . . . . . . . 
`)
    SoulRightWalkAtk = animation.createAnimation(ActionKind.SoulRightWalkAtk, 166.66)
    animation.attachAnimation(HeroPlayer, SoulRightWalkAtk)
    SoulRightWalkAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . 8 . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . 8 8 . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . 8 8 a 8 8 8 8 8 8 8 . . . . . . . . . . . . . 
. . . . . . . . 8 a a a a a a a a 1 1 8 . . . . . . . . . . . . 
. . . . . . . 8 a a a a a a a f f f f 1 8 . . . . . . . . . . . 
. . . . . . 8 a a a 1 a a f f a a a a f f 8 . . . . . . . . . . 
. . . . . . 8 a a 1 a a f a a a 1 a a 8 a 8 . . . . . . . . . . 
. . . . . . 8 a 1 a a f 8 a a 1 a a 8 a 1 8 . . . . . . . . . . 
. . . . . . 8 a 1 a f 8 a a a a a 8 b 8 a 8 . . . . . . . . . . 
. . . . . . 8 a a a f 8 a a a a a 8 d b 8 8 . . . . . . . . . . 
. . . . . . 8 a a a 8 a a a 8 a 8 b f 1 b . . . . . . . . . . . 
. . . . . . . 8 a a 8 a a 8 a a 8 b f f b . . . . . . . . . . . 
. . . . . . . 8 a a 8 a a 8 a 8 b d f f b . . . . . . . . . . . 
. . . . . . . 8 a a 8 1 a 8 8 b d d d d b . . . . . . . . . . . 
. . . . . . . 8 a a 8 1 a 8 b d d d d d f . . . . . . . . . . . 
. . . . . . . . 8 a a 8 1 8 b d d d d f . . . . . . . . . . . . 
. . . . . . . . 8 a a 8 8 f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . 8 8 . 8 f f f c . . . . . f f f f . . . . . . 
. . . . . . . . . 8 c c c f f f f c c f f f f f f f f . . . . . 
. . . . . . . . . c f f f f f f f f f c f f f f f f f . . . . . 
. . . . . . . . . f f f f f c f f f f c f f f f f f f . . . . . 
. . . . . . . . f f f f f f c f f f f c f f f f f f f . . . . . 
. . . . . . . . f f f f f f c f f f f c f f f f f f . . . . . . 
. . . . . . . f f f f f f c f f f f f . c f f f f . . . . . . . 
. . . . . . f f f f f f f c f f f f f . . . . . . . . . . . . . 
. . . . . . f f f f f f f c f f f f f . . . . . . . . . . . . . 
. . . . . . . f f f f f c f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . c c c f f f f f f f f . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f f . . . . . . . . . . . 
. . . . . . . f f f f f f f f f f f f f f . . . . . . . . . . . 
. . . . . . . f f f f f f f f f f f f f f . . . . . . . . . . . 
`)
    SoulRightWalkAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . 8 . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . 8 8 . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . 8 8 a a 8 8 8 8 8 8 . . . . . . . . . . . . . 
. . . . . . . . 8 a a a a a a a 1 1 1 8 . . . . . . . . . . . . 
. . . . . . . 8 a a a a a a a f f f f 1 8 . . . . . . . . . . . 
. . . . . . 8 a a a a a a f f a a a a f 1 8 . . . . . . . . . . 
. . . . . . 8 a a a 1 a f f a a a a a 8 f 8 . . . . . . . . . . 
. . . . . . 8 a a 1 a f 8 a a a 1 a 8 a a 8 . . . . . . . . . . 
. . . . . . 8 a 1 a f 8 a a a 1 a 8 b 8 1 8 . . . . . . . . . . 
. . . . . . 8 a 1 a 8 a a a a a a 8 d 8 8 . . . . . . . . . . . 
. . . . . . 8 a a a 8 a a a 8 a 8 b f 1 b . . . . . . . . . . . 
. . . . . . 8 a a a 8 a a 8 a a 8 b f f b . . . . . . . . . . . 
. . . . . . . 8 a 8 a a a 8 a 8 b d f f b . . . . . . . . . . . 
. . . . . . . 8 a 8 a a 8 8 8 b d d d d b . . . . . . . . . . . 
. . . . . . . 8 a 8 1 a 8 b b d d d d d f . . . . . . . . . . . 
. . . . . . . 8 a a 8 1 8 b d d d d d f . . . . . . . . . . . . 
. . . . . . . . 8 a a 8 f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . 8 c 8 f f f f c c c . . f f f f . . . . . . . 
. . . . . . . . . c f f f f f f f f f c f f f f f f . . . . . . 
. . . . . . . . f f f f f c f f f f f c f f f f f f f . . . . . 
. . . . . . . . f f f f f c f f f f f c f f f f f f f . . . . . 
. . . . . . . . c f f f f f c f f f f c f f f f f f f . . . . . 
. . . . . . . . c f f f f f c f f f f c f f f f f f . . . . . . 
. . . . . . . . c f f f f f f c f f f . c f f f . . . . . . . . 
. . . . . . . . . c f f f f f c f f f f . . . . . . . . . . . . 
. . . . . . . . . f c c c c c f f f f f f . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f f . . . . . . . . . . . 
. . . . . . . f f f f f f f f f f f f f f . . . . . . . . . . . 
. . . . . . f f f f f f f f f f f f f f f . . . . . . . . . . . 
`)
    SoulRightWalkAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . 8 . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . 8 8 . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . 8 8 a 8 8 8 8 8 8 8 . . . . . . . . . . . . . 
. . . . . . . . 8 a a a a a a a a 1 1 8 . . . . . . . . . . . . 
. . . . . . . 8 a a a a a a a f f f f 1 8 . . . . . . . . . . . 
. . . . . . 8 a a a 1 a a f f a a a a f f 8 . . . . . . . . . . 
. . . . . . 8 a a 1 a a f a a a 1 a a 8 a 8 . . . . . . . . . . 
. . . . . . 8 a 1 a a f 8 a a 1 a a 8 a 1 8 . . . . . . . . . . 
. . . . . . 8 a 1 a f 8 a a a a a 8 b 8 a 8 . . . . . . . . . . 
. . . . . . 8 a a a f 8 a a a a a 8 d b 8 8 . . . . . . . . . . 
. . . . . . 8 a a a 8 a a a 8 a 8 b f 1 b . . . . . . . . . . . 
. . . . . . . 8 a a 8 a a 8 a a 8 b f f b . . . . . . . . . . . 
. . . . . . . 8 a a 8 a a 8 a 8 b d f f b . . . . . . . . . . . 
. . . . . . . 8 a a 8 1 a 8 8 b d d d d b . . . . . . . . . . . 
. . . . . . . 8 a a 8 1 a 8 b d d d d d f . . . . . . . . . . . 
. . . . . . . . 8 a a 8 1 8 b d d d d f . . . . . . . . . . . . 
. . . . . . . . 8 a a 8 8 f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . 8 8 . 8 f f f c . . . . f f f f . . . . . . . 
. . . . . . . . . 8 c c c f f f f c c f f f f f f f . . . . . . 
. . . . . . . . . c f f f f f f f f f c f f f f f f f . . . . . 
. . . . . . . . . f f f f f f f f f f c f f f f f f f . . . . . 
. . . . . . . . . f f f f f f c f f f c f f f f f f f . . . . . 
. . . . . . . . . f f f f f f f c f f c f f f f f f f . . . . . 
. . . . . . . . . f f f f f f f f c f . c f f f f f . . . . . . 
. . . . . . . . . c f f f f f f f c f . . . . . . . . . . . . . 
. . . . . . . . . . c f f f f f f c f . . . . . . . . . . . . . 
. . . . . . . . . f c f f f f f c f f . . . . . . . . . . . . . 
. . . . . . . . f f f c c c c c f f f . . . . . . . . . . . . . 
. . . . . . . f f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . f f f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . f f f f f f f f f f f f f f . . . . . . . . . . . . 
`)
    SoulRightWalkAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . 8 . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . 8 8 . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . 8 8 a a 8 8 8 8 8 8 . . . . . . . . . . . . . 
. . . . . . . . 8 a a a a a a a 1 1 1 8 . . . . . . . . . . . . 
. . . . . . . 8 a a a a a a a f f f f 1 8 . . . . . . . . . . . 
. . . . . . 8 a a a a a a f f a a a a f 1 8 . . . . . . . . . . 
. . . . . . 8 a a a 1 a f f a a a a a 8 f 8 . . . . . . . . . . 
. . . . . . 8 a a 1 a f 8 a a a 1 a 8 a a 8 . . . . . . . . . . 
. . . . . . 8 a 1 a f 8 a a a 1 a 8 b 8 1 8 . . . . . . . . . . 
. . . . . . 8 a 1 a 8 a a a a a a 8 d 8 8 . . . . . . . . . . . 
. . . . . . 8 a a a 8 a a a 8 a 8 b f 1 b . . . . . . . . . . . 
. . . . . . 8 a a a 8 a a 8 a a 8 b f f b . . . . . . . . . . . 
. . . . . . . 8 a 8 a a a 8 a 8 b d f f b . . . . . . . . . . . 
. . . . . . . 8 a 8 a a 8 8 8 b d d d d b . . . . . . . . . . . 
. . . . . . . 8 a 8 1 a 8 b b d d d d d f . . . . . . . . . . . 
. . . . . . . 8 a a 8 1 8 b d d d d d f . . . . . . . . . . . . 
. . . . . . . . 8 a a 8 f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . 8 c 8 f f f f c c c . . f f f f . . . . . . . 
. . . . . . . . . c f f f f f f f f f c f f f f f f . . . . . . 
. . . . . . . . f f f f f c f f f f f c f f f f f f f . . . . . 
. . . . . . . . f f f f f c f f f f f c f f f f f f f . . . . . 
. . . . . . . . c f f f f f c f f f f c f f f f f f f . . . . . 
. . . . . . . . c f f f f f c f f f f c f f f f f f . . . . . . 
. . . . . . . . c f f f f f f c f f f . c f f f . . . . . . . . 
. . . . . . . . . c f f f f f c f f f f . . . . . . . . . . . . 
. . . . . . . . . f c c c c c f f f f f f . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f f . . . . . . . . . . . 
. . . . . . . f f f f f f f f f f f f f f . . . . . . . . . . . 
. . . . . . f f f f f f f f f f f f f f f . . . . . . . . . . . 
`)
    SoulRightIdleAtk = animation.createAnimation(ActionKind.SoulRightIdleAtk, 250)
    animation.attachAnimation(HeroPlayer, SoulRightIdleAtk)
    SoulRightIdleAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . 8 . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . 8 8 . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . 8 8 a 8 8 8 8 8 8 8 . . . . . . . . . . . . . 
. . . . . . . . 8 a a a a a a a a 1 1 8 . . . . . . . . . . . . 
. . . . . . . 8 a a a a a a a f f f f 1 8 . . . . . . . . . . . 
. . . . . . 8 a a a 1 a a f f a a a a f f 8 . . . . . . . . . . 
. . . . . . 8 a a 1 a a f a a a 1 a a 8 a 8 . . . . . . . . . . 
. . . . . . 8 a 1 a a f 8 a a 1 a a 8 a 1 8 . . . . . . . . . . 
. . . . . . 8 a 1 a f 8 a a a a a 8 b 8 a 8 . . . . . . . . . . 
. . . . . . 8 a a a f 8 a a a a a 8 d b 8 8 . . . . . . . . . . 
. . . . . . 8 a a a 8 a a a 8 a 8 b f 1 b . . . . . . . . . . . 
. . . . . . . 8 a a 8 a a 8 a a 8 b f f b . . . . . . . . . . . 
. . . . . . . 8 a a 8 a a 8 a 8 b d f f b . . . . . . . . . . . 
. . . . . . . 8 a a 8 1 a 8 8 b d d d d b . . . . . . . . . . . 
. . . . . . . 8 a a 8 1 a 8 b d d d d d f . . . . . . . . . . . 
. . . . . . . . 8 a a 8 1 8 b d d d d f . . . . . . . . . . . . 
. . . . . . . . 8 a a 8 8 f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . 8 8 . 8 f f f c . . . . . f f f f . . . . . . 
. . . . . . . . . 8 c c c f f f f c c f f f f f f f f . . . . . 
. . . . . . . . . c f f f f f f f f f c f f f f f f f . . . . . 
. . . . . . . . . f f f f f c f f f f c f f f f f f f . . . . . 
. . . . . . . . f f f f f f c f f f f c f f f f f f f . . . . . 
. . . . . . . . f f f f f f c f f f f c f f f f f f . . . . . . 
. . . . . . . f f f f f f c f f f f f . c f f f f . . . . . . . 
. . . . . . f f f f f f f c f f f f f . . . . . . . . . . . . . 
. . . . . . f f f f f f f c f f f f f . . . . . . . . . . . . . 
. . . . . . . f f f f f c f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . c c c f f f f f f f f . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f f . . . . . . . . . . . 
. . . . . . . f f f f f f f f f f f f f f . . . . . . . . . . . 
. . . . . . . f f f f f f f f f f f f f f . . . . . . . . . . . 
`)
    SoulRightIdleAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . 8 . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . 8 8 . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . 8 8 a a 8 8 8 8 8 8 . . . . . . . . . . . . . 
. . . . . . . . 8 a a a a a a a 1 1 1 8 . . . . . . . . . . . . 
. . . . . . . 8 a a a a a a a f f f f 1 8 . . . . . . . . . . . 
. . . . . . 8 a a a a a a f f a a a a f 1 8 . . . . . . . . . . 
. . . . . . 8 a a a 1 a f f a a a a a 8 f 8 . . . . . . . . . . 
. . . . . . 8 a a 1 a f 8 a a a 1 a 8 a a 8 . . . . . . . . . . 
. . . . . . 8 a 1 a f 8 a a a 1 a 8 b 8 1 8 . . . . . . . . . . 
. . . . . . 8 a 1 a 8 a a a a a a 8 d 8 8 . . . . . . . . . . . 
. . . . . . 8 a a a 8 a a a 8 a 8 b f 1 b . . . . . . . . . . . 
. . . . . . 8 a a a 8 a a 8 a a 8 b f f b . . . . . . . . . . . 
. . . . . . . 8 a 8 a a a 8 a 8 b d f f b . . . . . . . . . . . 
. . . . . . . 8 a 8 a a 8 8 8 b d d d d b . . . . . . . . . . . 
. . . . . . . 8 a 8 1 a 8 b b d d d d d f . . . . . . . . . . . 
. . . . . . . 8 a a 8 1 8 b d d d d d f . . . . . . . . . . . . 
. . . . . . . . 8 a a 8 f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . 8 c 8 f f f f c c c . . f f f f . . . . . . . 
. . . . . . . . . c f f f f f f f f f c f f f f f f . . . . . . 
. . . . . . . . . f f f f f f f f f f c f f f f f f f . . . . . 
. . . . . . . . f f f f f c f f f f f c f f f f f f f . . . . . 
. . . . . . . f f f f f f c f f f f f c f f f f f f f . . . . . 
. . . . . . f f f f f f f c f f f f f c f f f f f f . . . . . . 
. . . . . f f f f f f f c f f f f f f . c f f f . . . . . . . . 
. . . . . f f f f f f f c f f f f f f . . . . . . . . . . . . . 
. . . . . . f f f f f c f f f f f f f f . . . . . . . . . . . . 
. . . . . . . c c c c f f f f f f f f f f . . . . . . . . . . . 
. . . . . . . f f f f f f f f f f f f f f . . . . . . . . . . . 
. . . . . . f f f f f f f f f f f f f f f f . . . . . . . . . . 
`)
    SoulRightJump = animation.createAnimation(ActionKind.SoulRightJump, 250)
    animation.attachAnimation(HeroPlayer, SoulRightJump)
    SoulRightJump.addAnimationFrame(img`
. . . . . . . . . . . 8 . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . 8 8 . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . 8 8 a 8 8 8 8 8 8 8 . . . . . . . . . . . . . 
. . . . . . . . 8 a a a a a a a a 1 1 8 . . . . . . . . . . . . 
. . . . . . . 8 a a a a a a a f f f f 1 8 . . . . . . . . . . . 
. . . . . . 8 a a a 1 a a f f a a a a f f 8 . . . . . . . . . . 
. . . . . . 8 a a 1 a a f a a a 1 a a 8 a 8 . . . . . . . . . . 
. . . . . . 8 a 1 a a f 8 a a 1 a a 8 a 1 8 . . . . . . . . . . 
. . . . . . 8 a 1 a f 8 a a a a a 8 b 8 a 8 . . . . . . . . . . 
. . . . . . 8 a a a f 8 a a a a a 8 d b 8 8 . . . . . . . . . . 
. . . . . . 8 a a a 8 a a a 8 a 8 b f 1 b . . . . . . . . . . . 
. . . . . . . 8 a a 8 a a 8 a a 8 b f f b . . . . . . . . . . . 
. . . . . . . 8 a a 8 a a 8 a 8 b d f f b . . . . . . . . . . . 
. . . . . . . 8 a a 8 1 a 8 8 b d d d d b . . . . . . . . . . . 
. . . . . . . 8 a a 8 1 a 8 b d d d d d f . . . . . . . . . . . 
. . . . . . . . 8 a a 8 1 8 b d d d d f . . . . . . . . . . . . 
. . . . . . . . 8 a a 8 8 f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . 8 8 . 8 f f f c c . . . . . . . . . . . . . . 
. . . . . . . . . c c c c f f f f f c . . . . . . . . . . . . . 
. . . . . . . . c f f f f f f f f f f c . . . . . . . . . . . . 
. . . . . . f f f f f f f f f f f f f c . . . . . . . . . . . . 
. . . . . f f f f f f f f f f f f f f c . . . . . . . . . . . . 
. . . . f f f f f f f f f f c f f f f c . . . . . . . . . . . . 
. . . . f f f f f f f f c c f f f f f c . . . . . . . . . . . . 
. . . . f f f f f f c c f f f f f f f c . . . . . . . . . . . . 
. . . . . f f f f c f f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . . f f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . f f f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . f f f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . f f f f f f f f f f f f . . . . . . . . . . . . . 
. . . . . . f f f f f f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . f f f f f f f f f f f . . . . . . . . . . . . . . 
`)
    SoulRightJump.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . 8 . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . 8 8 . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . 8 8 a a 8 8 8 8 8 8 . . . . . . . . . . . . . 
. . . . . . . . 8 a a a a a a a 1 1 1 8 . . . . . . . . . . . . 
. . . . . . . 8 a a a a a a a f f f f 1 8 . . . . . . . . . . . 
. . . . . . 8 a a a a a a f f a a a a f 1 8 . . . . . . . . . . 
. . . . . . 8 a a a 1 a f f a a a a a 8 f 8 . . . . . . . . . . 
. . . . . . 8 a a 1 a f 8 a a a 1 a 8 a a 8 . . . . . . . . . . 
. . . . . . 8 a 1 a f 8 a a a 1 a 8 b 8 1 8 . . . . . . . . . . 
. . . . . . 8 a 1 a 8 a a a a a a 8 d 8 8 . . . . . . . . . . . 
. . . . . . 8 a a a 8 a a a 8 a 8 b f 1 b . . . . . . . . . . . 
. . . . . . 8 a a a 8 a a 8 a a 8 b f f b . . . . . . . . . . . 
. . . . . . . 8 a 8 a a a 8 a 8 b d f f b . . . . . . . . . . . 
. . . . . . . 8 a 8 a a 8 8 8 b d d d d b . . . . . . . . . . . 
. . . . . . . 8 a 8 1 a 8 b b d d d d d f . . . . . . . . . . . 
. . . . . . . 8 a a 8 1 8 b d d d d d f . . . . . . . . . . . . 
. . . . . . . . 8 a a 8 f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . 8 c 8 c f f f f c c . . . . . . . . . . . . . 
. . . . . . . . c c f f f f f f f f f c . . . . . . . . . . . . 
. . . . f f f f f f f f f f f f f f f c . . . . . . . . . . . . 
. . . f f f f f f f f f f f f f f f f c . . . . . . . . . . . . 
. . . f f f f f f f f f f f f f f f f c . . . . . . . . . . . . 
. . . f f f f f f f f f f f c f f f f c . . . . . . . . . . . . 
. . . f f f f f f f f f c c f f f f f c . . . . . . . . . . . . 
. . . . f f f f f f c c f f f f f f f c . . . . . . . . . . . . 
. . . . . f f f f c f f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . f f f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f . . . . . . . . . . . . . 
. . . . . . f f f f f f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . f f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f . . . . . . . . . . . . . 
`)
    SoulRightJumpAtk = animation.createAnimation(ActionKind.SoulRightJumpAtk, 250)
    animation.attachAnimation(HeroPlayer, SoulRightJumpAtk)
    SoulRightJumpAtk.addAnimationFrame(img`
. . . . . . . . . . . 8 . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . 8 8 . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . 8 8 a 8 8 8 8 8 8 8 . . . . . . . . . . . . . 
. . . . . . . . 8 a a a a a a a a 1 1 8 . . . . . . . . . . . . 
. . . . . . . 8 a a a a a a a f f f f 1 8 . . . . . . . . . . . 
. . . . . . 8 a a a 1 a a f f a a a a f f 8 . . . . . . . . . . 
. . . . . . 8 a a 1 a a f a a a 1 a a 8 a 8 . . . . . . . . . . 
. . . . . . 8 a 1 a a f 8 a a 1 a a 8 a 1 8 . . . . . . . . . . 
. . . . . . 8 a 1 a f 8 a a a a a 8 b 8 a 8 . . . . . . . . . . 
. . . . . . 8 a a a f 8 a a a a a 8 d b 8 8 . . . . . . . . . . 
. . . . . . 8 a a a 8 a a a 8 a 8 b f 1 b . . . . . . . . . . . 
. . . . . . . 8 a a 8 a a 8 a a 8 b f f b . . . . . . . . . . . 
. . . . . . . 8 a a 8 a a 8 a 8 b d f f b . . . . . . . . . . . 
. . . . . . . 8 a a 8 1 a 8 8 b d d d d b . . . . . . . . . . . 
. . . . . . . 8 a a 8 1 a 8 b d d d d d f . . . . . . . . . . . 
. . . . . . . . 8 a a 8 1 8 b d d d d f . . . . . . . . . . . . 
. . . . . . . . 8 a a 8 8 f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . 8 8 . 8 f f f c c . . . . f f f f . . . . . . 
. . . . . . . . . c c c c f f f f f c f f f f f f f f . . . . . 
. . . . . . . . c f f f f f f f f f f c f f f f f f f . . . . . 
. . . . . . f f f f f f f f f f f f f c f f f f f f f . . . . . 
. . . . . f f f f f f f f f f f f f f c f f f f f f f . . . . . 
. . . . f f f f f f f f f f c f f f f c f f f f f f . . . . . . 
. . . . f f f f f f f f c c f f f f f . c f f f f . . . . . . . 
. . . . f f f f f f c c f f f f f f f . . . . . . . . . . . . . 
. . . . . f f f f c f f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . . f f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . f f f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . f f f f f f f f f f f f f f f . . . . . . . . . . 
. . . . . . f f f f f f f f f f f f f f f f f . . . . . . . . . 
. . . . . . . f f f f f f f f f f f f f f f . . . . . . . . . . 
`)
    SoulRightJumpAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . 8 . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . 8 8 . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . 8 8 a a 8 8 8 8 8 8 . . . . . . . . . . . . . 
. . . . . . . . 8 a a a a a a a 1 1 1 8 . . . . . . . . . . . . 
. . . . . . . 8 a a a a a a a f f f f 1 8 . . . . . . . . . . . 
. . . . . . 8 a a a a a a f f a a a a f 1 8 . . . . . . . . . . 
. . . . . . 8 a a a 1 a f f a a a a a 8 f 8 . . . . . . . . . . 
. . . . . . 8 a a 1 a f 8 a a a 1 a 8 a a 8 . . . . . . . . . . 
. . . . . . 8 a 1 a f 8 a a a 1 a 8 b 8 1 8 . . . . . . . . . . 
. . . . . . 8 a 1 a 8 a a a a a a 8 d 8 8 . . . . . . . . . . . 
. . . . . . 8 a a a 8 a a a 8 a 8 b f 1 b . . . . . . . . . . . 
. . . . . . 8 a a a 8 a a 8 a a 8 b f f b . . . . . . . . . . . 
. . . . . . . 8 a 8 a a a 8 a 8 b d f f b . . . . . . . . . . . 
. . . . . . . 8 a 8 a a 8 8 8 b d d d d b . . . . . . . . . . . 
. . . . . . . 8 a 8 1 a 8 b b d d d d d f . . . . . . . . . . . 
. . . . . . . 8 a a 8 1 8 b d d d d d f . . . . . . . . . . . . 
. . . . . . . . 8 a a 8 f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . 8 c 8 c f f f f c c . . f f f f . . . . . . . 
. . . . . . . . c c f f f f f f f f f c f f f f f f . . . . . . 
. . . . f f f f f f f f f f f f f f f c f f f f f f f . . . . . 
. . . f f f f f f f f f f f f f f f f c f f f f f f f . . . . . 
. . . f f f f f f f f f f f f f f f f c f f f f f f f . . . . . 
. . . f f f f f f f f f f f c f f f f c f f f f f f . . . . . . 
. . . f f f f f f f f f c c f f f f f . c f f f . . . . . . . . 
. . . . f f f f f f c c f f f f f f f . . . . . . . . . . . . . 
. . . . . f f f f c f f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f f . . . . . . . . . . . 
. . . . . . f f f f f f f f f f f f f f f f f . . . . . . . . . 
. . . . . . . f f f f f f f f f f f f f f f . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f f . . . . . . . . . . . 
`)
}
// Monsters for level 4
function MonsterSprites () {
    MonsterSet = [img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`]
    for (let value222 of scene.getTilesByType(2)) {
        MonsterChoose = Math.randomRange(0, 1)
        MonsterPlace = sprites.create(MonsterSet[MonsterChoose], SpriteKind.Monster)
        if (MonsterChoose == 0) {
            // Idle for Enemy "Beast"
            animation.runImageAnimation(
            MonsterPlace,
            [img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . f c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . f c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f c a a f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . f a a a a a a a a a f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . f . . . f f c a f f a a a a a a a f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . f f f f c c c f f f a c a a a a a c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . f c a a a c c f f a a f c a a a a a c f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . f a a a a a a a a a f c f c a a a a a c c f f f f f f f . . . . . . . f f f f . . . . . . . . . . . . . . . . . . . . 
. . . . . . f a a c f c f c f c c f c a a a a c f f a a c c f c c f f f f f f f c c a a f f . . . . . . . . . . . . . . . . . . 
. . . . . . . f c f c f c f c f c f c a a a c f a a a a a c c f c c c c c c c c a a a a a a f f . . . . . . . . . . . . f . . . 
. . . . . . f c f c f c f c f c f c a a a c f a a a a a a a c c f c c c c c a a a a a a a a a a f f . . . . . . . . . f f . . . 
. . . . . . f a c c a a c a c c a a a a a c f c a a a a a a f f f f c c c a a a a a a a a a a a a a f . . . . . . . f a f . . . 
. . . . . . . f f f f f a a a a a a a a a c f c c a a a a a c c c c f c a a a a a a a a a a c c c a a f f . . . f f a a f . . . 
. . . . . . . . . . . . f f f f c a a a a a c f c a a a c c c c c c f c a a a a a a a a a c c c c c a a a f f f a a a f . . . . 
. . . . . . . . . . . . . . . . f c a a a a a c f c c c c c c c c c f c a a a a a a a a a a f f c c c a a a a a a a f . . . . . 
. . . . . . . . . . . . . . . . . f c a a a a c c f f c c c c a c c f c c a a a a a a a a a a a f c c c c a f f f f . . . . . . 
. . . . . . . . . . . . . . . . . f f f f c c c c c c f c c a a a c f c c c a a f c a a a a a a a f c f f f . . . . . . . . . . 
. . . . . . . . . . . . . . . . . f c c c f f c c c f . f a a a a c f f f f f f f f c a a a a a a c f . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . f c c c c f f f . . . f a a a f . . . f c c c c f c a a a a c c f . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . f c c c c f . . . . . f c a a f . . . f c c c c f f c c c c c c c f . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . f c c c f . . . . . . f c c a f . . . f c c c c f . f f f f c c c c f . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . f c c c c f . . . . . . f c c f . . . . . f c c c c f . . . . f c c a a f . . . . . . . . . . 
. . . . . . . . . . . . . . . . . f c c c f . . . . . . . f c a f . . . . . . f f c c f . . . . . f a a a a f . . . . . . . . . 
. . . . . . . . . . . . . . . . f c c c f . . . . . . . f c a a f . . . . . . . . f c c f . . . . . f a a a f . . . . . . . . . 
. . . . . . . . . . . . . . . f c c c c f . . . . . . . f a a c f . . . . . . . . f c c c f . . . . . f a a f . . . . . . . . . 
. . . . . . . . . . . f f . f c c c c c c f . . f f . f a a a c c f . . . f f . f c c c c c f . f f . f a c f . . . . . . . . . 
. . . . . . . . . . f c c f c c c c c c f . . f a a f a a a c c f . . . f c c f c c c c f f . f a a f a c c c f . . . . . . . . 
. . . . . . . . . . f c f c c c c c c f . . . f a f a a c c c f . . . . f c f c c c c f . . . f a f a c c c f . . . . . . . . . 
. . . . . . . . . . . f . f f f f f f . . . . . f . f f f f f . . . . . . f . f f f f . . . . . f . f f f f . . . . . . . . . . 
`,img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . f f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . f c f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . f c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f c a a f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . f a a a a a a a a a f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . f . . . f f c a f f a a a a a a a c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . f f f f c c c f f f a f a a a a a a c f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . f c a a a c c f f a f c f a a a a a a c c f f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . f a a a a a a a a a f c f c a a a a c c c f f f f f f f . . f f f f f f f f f . . . . . . . . . . . . . . . . . . . . 
. . . . . . f a f c f c f c f c c f c a a a c f f f a a c c f c c f f c c c c c a a a a f f f f . . . . . . . . . . . . . . . . 
. . . . . . . f c f c f c f c f f c c a a c f a a a a a a c c f c c c c c c a a a a a a a a a a f f . . . . . . . . . . . . f . 
. . . . . . . f a c c a a c a c c a a a c f c a a a a a a a c c f c c c c a a a a a a a a a c a a a f f . . . . . . . . . f f . 
. . . . . . . . f f f f f a a a a a a a c f c a a a a a a a c c f f c c a a a a a a a a a c c c c a a a f f f . . . . f f a f . 
. . . . . . . . . . . . . f f f f c a a c f c c a a a a a c f f c c f c a a a a a a a a a c c c c c c c a a a f f f f a a a f . 
. . . . . . . . . . . . . . . . . f a a a c f c c a a a c c c c c c f c a a a a a a a a a a f f c c c c c a a a a a a a f f . . 
. . . . . . . . . . . . . . . . . f c a a a c f c c c c c c c c c c f c c a a a a a a a a a a a f c c c c c f f f f f f . . . . 
. . . . . . . . . . . . . . . . . f f f f a a c f f c c c c c a c c f c c c a f c c a a a a a a a f c f f f . . . . . . . . . . 
. . . . . . . . . . . . . . . . . f c c c f f c c c f f a a a a c f f f f f f f f c c a a a a a a c f . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . f c c c c f f f . . f a a a f . . . f c c c c f c c a a a a c c f . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . f c c c c f . . . . f c a f . . . . f c c c c f f c c c c c c c f . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . f c c c c f . . . . . f c a f . . . f c c c c f . f f c c c c c c f . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . f c c c c f . . . . . . f c c f . . . . f f c c c f . . f f f c c a a f . . . . . . . . . . 
. . . . . . . . . . . . . . . . . f c c c c f . . . . . . f c a a f . . . . . . f f c c f . . . . f f a a a f . . . . . . . . . 
. . . . . . . . . . . . . . . . f c c c c f . . . . . . . f a a c f . . . . . . . . f c c f f . . . . f a a a f . . . . . . . . 
. . . . . . . . . . . . f f . f c c c c c c f . . f f . f a a a c c f . . . f f . f c c c c c f . f f . f a c f . . . . . . . . 
. . . . . . . . . . . f c c f c c c c c c f . . f a a f a a a c c f . . . f c c f c c c c f f . f a a f a c c c f . . . . . . . 
. . . . . . . . . . . f c f c c c c c c f . . . f a f a a c c c f . . . . f c f c c c c f . . . f a f a c c c f . . . . . . . . 
. . . . . . . . . . . . f . f f f f f f . . . . . f . f f f f f . . . . . . f . f f f f . . . . . f . f f f f . . . . . . . . . 
`,img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . f c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . f c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f c a a f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . f a a a a a a a a a f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . f . . . f f c a f f a a a a a a a c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . f f f f c c c f f a a c a a a a a a c f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . f c a a a c c a a a c f c a a a a a a c c f f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . f a a a a a a a a a f c f c a a a a a c c f f f f f f f . . f f f f f f f . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . f a f c f c f c f c c f c a a a a c f f a a c c f c c f f c c c c c a a f f f f . . . . . . . . . . . . . . . . . . 
. . . . . . . f . f . f . f . f c f c a a c c f a a a a a c c f c c c c c c a a a a a a a a f f f . . . . . . . . . . . . . . . 
. . . . . . . f . f . f f c f c f a a a a c f a a a a a a a c c f f c c c a a a a a a a a a a a a f . . . . . . . . . . . . . . 
. . . . . . f c f c f c c a c c a a a a a c f c a a a a a a c f c c f c a a a a a a a a a a c c a a f f . . . . . . . . . . . . 
. . . . . . f a c c a a a a a a a a a a a c f c c a a a a f f c c c f c a a a a a a a a a c c c c a a a f . . . . . . . . . . . 
. . . . . . . f f f f f f f f f c c a a a a c f c a a a c c c c c c f c a a a a a a a a a a f f c c c c a f f f . . . . . . . . 
. . . . . . . . . . . . . . . . f f c c c a a c f c c c c c c c c c f c c a a a a a a a a a a a f c c c c a a a f f . . . . . . 
. . . . . . . . . . . . . . . . . f f f f c a a c f f c c c c a c c f c c c a f c c a a a a a a a f c f f f f a a a f . . . . . 
. . . . . . . . . . . . . . . . . f c c c f f c c c f f f c a a c f f f f f f f f c c a a a a a a c f . . . . f a a a f . . . . 
. . . . . . . . . . . . . . . . . . f c c c c f f f . . . f c a c f . . f c c c c f c c a a a a c c f . . . . . f f a a f . . . 
. . . . . . . . . . . . . . . . . . . f c c c c f . . . . . f a c f . . . f c c c c f f c c c c c c c f f f . . . . f a f . . . 
. . . . . . . . . . . . . . . . . . . f c c c c f . . . . . f c c f . . . . f f c c c f f f f f f f c c a a f . . . . f f . . . 
. . . . . . . . . . . . . . . . . . f c c c c f . . . . . . f c a a f . . . . . f f f c c c f . . . f f a a a f . . . . f . . . 
. . . . . . . . . . . . . . . . . f c c c c f . . . . . . . f a a c f . . . . . . . . f c c c f . . . . f a a a f . . . . . . . 
. . . . . . . . . . . . . f f . f c c c c c c f . . f f . f a a a c c f . . . f f . f c c c c c f . f f . f a c f . . . . . . . 
. . . . . . . . . . . . f c c f c c c c c c f . . f a a f a a a c c f . . . f c c f c c c c f f . f a a f a c c c f . . . . . . 
. . . . . . . . . . . . f c f c c c c c c f . . . f a f a a c c c f . . . . f c f c c c c f . . . f a f a c c c f . . . . . . . 
. . . . . . . . . . . . . f . f f f f f f . . . . . f . f f f f f . . . . . . f . f f f f . . . . . f . f f f f . . . . . . . . 
`,img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . f f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . f c f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . f c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f c a a f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . f a a a a a a a a a f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . f . . . f f c a f f a a a a a a a c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . f f f f c c c f f f a f a a a a a a c f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . f c a a a c c f f a f c f a a a a a a c c f f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . f a a a a a a a a a f c f c a a a a c c c f f f f f f f . . f f f f f f f f f . . . . . . . . . . . . . . . . . . . . 
. . . . . . f a f c f c f c f c c f c a a a c f f f a a c c f c c f f c c c c c a a a a f f f f . . . . . . . . . . . . . . . . 
. . . . . . . f c f c f c f c f f c c a a c f a a a a a a c c f c c c c c c a a a a a a a a a a f f . . . . . . . . . . . . f . 
. . . . . . . f a c c a a c a c c a a a c f c a a a a a a a c c f c c c c a a a a a a a a a c a a a f f . . . . . . . . . f f . 
. . . . . . . . f f f f f a a a a a a a c f c a a a a a a a c c f f c c a a a a a a a a a c c c c a a a f f f . . . . f f a f . 
. . . . . . . . . . . . . f f f f c a a c f c c a a a a a c f f c c f c a a a a a a a a a c c c c c c c a a a f f f f a a a f . 
. . . . . . . . . . . . . . . . . f a a a c f c c a a a c c c c c c f c a a a a a a a a a a f f c c c c c a a a a a a a f f . . 
. . . . . . . . . . . . . . . . . f c a a a c f c c c c c c c c c c f c c a a a a a a a a a a a f c c c c c f f f f f f . . . . 
. . . . . . . . . . . . . . . . . f f f f a a c f f c c c c c a c c f c c c a f c c a a a a a a a f c f f f . . . . . . . . . . 
. . . . . . . . . . . . . . . . . f c c c f f c c c f f a a a a c f f f f f f f f c c a a a a a a c f . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . f c c c c f f f . . f a a a f . . . f c c c c f c c a a a a c c f . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . f c c c c f . . . . f c a f . . . . f c c c c f f c c c c c c c f . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . f c c c c f . . . . . f c a f . . . f c c c c f . f f c c c c c c f . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . f c c c c f . . . . . . f c c f . . . . f f c c c f . . f f f c c a a f . . . . . . . . . . 
. . . . . . . . . . . . . . . . . f c c c c f . . . . . . f c a a f . . . . . . f f c c f . . . . f f a a a f . . . . . . . . . 
. . . . . . . . . . . . . . . . f c c c c f . . . . . . . f a a c f . . . . . . . . f c c f f . . . . f a a a f . . . . . . . . 
. . . . . . . . . . . . f f . f c c c c c c f . . f f . f a a a c c f . . . f f . f c c c c c f . f f . f a c f . . . . . . . . 
. . . . . . . . . . . f c c f c c c c c c f . . f a a f a a a c c f . . . f c c f c c c c f f . f a a f a c c c f . . . . . . . 
. . . . . . . . . . . f c f c c c c c c f . . . f a f a a c c c f . . . . f c f c c c c f . . . f a f a c c c f . . . . . . . . 
. . . . . . . . . . . . f . f f f f f f . . . . . f . f f f f f . . . . . . f . f f f f . . . . . f . f f f f . . . . . . . . . 
`],
            175,
            true
            )
        } else if (MonsterChoose == 1) {
            // Idle for Character "Sword"
            animation.runImageAnimation(
            MonsterPlace,
            [img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f f f f f f f f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f f c c c c c c c c c f f . . . . . . f f f f f f f f f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f f c c f f f f f f f c c c c f f f f f f c c c c c c c c c c f f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c c f d d 1 1 1 1 1 f c c c c c c c c c c c c c c c c c c c c c c f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f f f c c c f d d 1 1 1 1 1 1 1 f c c c c c c c c c c c c c c c c c c c c c c c f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f f c c c c c f d f f f 1 1 f f f 1 1 f c c c c c c c c c c c c c a a a a a a a a c c c f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c a a c c c f d f 1 f 1 1 f 1 f 1 1 f c c c c c c c c c c c a a a a a a a a a a a c c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c a a a c c c f d f f f 1 1 f f f 1 1 f c c c c c c c c c c c a a a a a a a a a a a a a c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c c a a a c c c f d d 1 1 1 1 1 1 1 1 1 f c c c a c c c c c c a a a a a a a a a a a a a a a c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c a a a a c c c f d f 1 1 1 1 1 1 f 1 1 f c c a a c c c c c c a a a a a a a a a a a a a a a a c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a a a a c c f d f f 1 1 1 1 f f 1 1 f c c a a c c c c c c a a a a a a c c c c a a a a a a a c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a a a a c c f d d f f f f f f 1 1 1 f c a a a a c c c c c a a a a a a c c c c c a a a a a a c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a a a a c c c f d d f f f f 1 1 1 f c c a a a a c c c c c a a a a a c c c c c c c a a a a a c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a a a a c c c c f d d d 1 1 1 1 f c c a a a a a c c c c c a a a a a c c c c c c c a a a a a c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a a a a c c c c a f f f f f f f c c a a a a a a c c c c c a a a a a c c c c c c c a a a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a a a a c c c a a a a a a a a a a a a a a a a c c c c c c a a a a a c c c c c a a a a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a a a a c c c c a a a a a a a a a a a a a a a c c c c c c a a a a a a c c c a a a a a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a a a a c c c a a a a a a a a a a a a a a a c c c c c c a a a a a a a a a a a a a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f f c c a a a a a c c c a a a a a a a a a a a a a a a c c c c c c a a a a a a a a a a a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c f f c c c a a a c c c a a a a a a a a a a a a a a c c c c c c c a a a a a a a a a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c c f f f c c c c c c c a a a a a a a a a a a a a c c c c c c c c a a a a a a a a a c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c c c c c f f f c c c c c c c a a a a a a a a a c c c c c c c c c c a a a a a c c c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c c c c c c c c f f f f f c c c c c c a a a a c c c c c c c c c c c c c c c c f f f f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c c c c c c c f . . f c c c c c c c c c a a a c c c c c c c c c c c c c f f f c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c c a c c c c f . . . f f c c c c c c c a a a a a c c c c c c c c c c c c c c c f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c c a a c c c f . . . . . f c c c c c a a a a a a a a c c c c c c c c c c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c a a a a c c f . . . . . . f c c c a a a a a a a a a a a c c c c c c c c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c a a a a c c f . . . . . . . f c c a a a a a a a a a a a c c c c c c c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c a a a a a c f . . . . . . . f c c c a a a a a a a a a a a c c c c c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c a a a a a c f . . . . . . . . f c c a a a a a a a a a a a c c c c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c a a a a a c f . . . . . . . . f c c c a a a a a a a a a a c c c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f a a a a a a a f . . . . . . . . f c c c c c c c a a c c c c c c c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f a a a a a a a f . . . . . . . . f c c c c c c c c a c c c c c c c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f a a a a a a a f . . . . . . . . . f c c c c c c c c c c c a c c c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f a a a a a a a f . . . . . . . . . f c c c c a a c c c c a a a c c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a a a f . . . . . . . . . . f c c c a a a a c c a a a a c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a a a f . . . . . . . . . . . f c a a a a a c a a a a a c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a a c f . . . . . . . . . . . f c a a a a a c a a a a a c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c a a a c f . . . . . . . . . . . f c a a a a c c a a a a a c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c a a a c f . . . . . . . . . . . f c a a a a c c c c a a a c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c c a c c f . . . . . . . . . . . f c c a a c c c c c c c a c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c c a c c f . . . . . . . . . . . f c c c c c c c c c c c c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c a a c f . . . . . . . . . . . . f c c a a c c c a a a c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c a a c f . . . . . . . . . . . . f c a a a a c a a a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a c f . . . . . . . . . . . . f c a a a a c a a a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a c f . . . . . . . . . . . . f c a a a a c a a a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f a a a a c f . . . . . . . . . . . . f c a a a a c c a a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f a a a a a f . . . . . . . . . . . . f c a a a c c c a a a c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f f a a a a a f . . . . . . . . . . . . f c c a c c c c c c a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c f a a a a a f . . . . . . . . . . . . f c c c c c c c c c c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c f a a a a f c f . . . . . . . . . . . f c c c c a a a c c c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a f a a a a f c c f . . . . . . . . . f c c c a a a a a a a c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a f a a a f a c c f . . . . . . . . f c a a a a a a a a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a f a a c f a c c f . . . . . . . . f c a a a a a a a a a a a c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c a a a a a f a a c c f . . . . . . . f c a a a a a a a a a a a a c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a a a a a a a a c f . . . . . . f c a a a a a a a a a a a a a c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a a a a a a a a c f . . . . . . f c a a a f f c a a a a a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a a a a a a a a c f . . . . . f c a a a a c c f c a a a a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a a a a a a a a c f . . . . . f c a a a a c c c f c c a a a c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a a a a a a a a c f . . . . f c a a a a a c c f f c c a a a c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a a a a a a a a c f . . . f c a a a a a c c f . . f c c a a c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c a a a a a a a a a c f . . . f c a a a a a c c f . . . f c a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c c a a a a a a a a c f . . f c a a a a a c c f . . . . f c a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c c a a a a a a a c c f . . f c a a a a c c f . . . . . f c a a a a c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c c a a a a a a a c c f . f c a a a a c c c f . . . . . . f c a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c c c a a a a a c c c f . f c a a a a c c f . . . . . . . f c a a a a c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c f f c c a a a a c c c f . f c a a a c c f . . . . . . . . . f c a a a c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c c c c c a c c c c f . f c a a c c f . . . . . . . . . . f c a a a c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a c c c c c c c c c f f c a a c c f . . . . . . . . . . . . f c a a a c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a c c c c c c c f . f c a a c f . . . . . . . . . . . . . f c c a a c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a c f c a a c c f . f c a a f . . . . . . . . . . . . . . . f c a a c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f a a a a c f c a a a c f f c a a a f . . . . . . . . . . . . . . . f c c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f a a a c c f c a a a c f f c a a c f . . . . . . . . . . . . . . . . f c c a f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f a a c c f c c a a a a f f c a a c f . . . . . . . . . . . . . . . . f a a a f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f a a c f c c c a a a a f f c c c c c f . . . . . . . . . . . . . . . f a a a f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f a a f c c c c a a a a f f c c c c c f . . . . . . . . . . . . . . . f a a a a f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a f c c c a a a a c f f c a a c c f . . . . . . . . . . . . . . . f c a a a f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c f c c a a a a c f f c a a c f . . . . . . . . . . . . . . . . f c a a a f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f f c c f c a a c c f . f c a a a f . . . . . . . . . . . . . . . . . f c a a f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c f f f f c c f c f . f c a a a f . . . . . . . . . . . . . . . . . f c a a f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c f c c c f f f a f f c a a a f . . . . . . . . . . . . . . . . . f c a a f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c f a f c f a f f a f . f c a f . . . . . . . . . . . . . . . . . . f c a a f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c f a f c f a f a a f . f c a f . . . . . . . . . . . . . . . . . . . f c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c f a c f a c f a c f . . f c f . . . . . . . . . . . . . . . . . . . f c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c f c c f a c f c c f . . f c f . . . . . . . . . . . . . . . . . . . f c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c c f c c f c c f . . f c f . . . . . . . . . . . . . . . . . . . f c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f f f . f f . f f . . . . f . . . . . . . . . . . . . . . . . . . . . f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
`,img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f f f f f f f f f . . . . . . . . . f f f f f f f f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f f c c c c c c c c c f f . . . . . . f c c c c c c c c c f f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f f f . f f c c c c c c c c c c c c c f f f f f f c c c c c c c c c c c c c f f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f f c a a f c c c c f f f f f f f c c c c c c c c c c c c c c c c c a a a a a c c c c f f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c a a c c c c c f d d 1 1 1 1 1 f c c c c c c c c c c c c c c a a a a a a a a a c c c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c a a a c c c c f d d d 1 1 1 1 1 1 f c c c c c c c c c c c c a a a a a a a a a a a a a c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c c a a a c c c f d f f f 1 1 f f f 1 1 f c c c c c c c c c c a a a a a a a a a a a a a a a c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c a a a a c c c f d f 1 f 1 1 f 1 f 1 1 f c c c a c c c c c a a a a a a a a a a a a a a a a a c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a a a a c c f d f f f 1 1 f f f 1 1 f c c c a c c c c c a a a a a a a a a a a a a a a a a a c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a a a a c c f d f 1 1 1 1 1 1 f 1 1 f c c c a a c c c c a a a a a a a c c c c a a a a a a a c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a a a a c c f d f f 1 1 1 1 f f 1 1 f c c c a a c c c c a a a a a a a c c c c c a a a a a a c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a a a a c c f d f f f f f f f f 1 1 f c c a a a c c c c a a a a a a c c c c c c c a a a a a c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a a a a c c f d d f f f f f f 1 1 1 f c c a a a a c c c a a a a a a c c c c c c c a a a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a a a c c c f d d f f f f 1 1 1 f c c a a a a a c c c a a a a a a c c c c c c c a a a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a a a c c c c f d d d 1 1 1 1 f c c c a a a a a c c c c a a a a a a c c c c c a a a a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f a a a a a a c c c c f f f f f f f c c c a a a a a a a c c c a a a a a a a c c c a a a a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a a a c c c c a a a a a a a a a a a a a a a a a c c c a a a a a a a a a a a a a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f f a a a a a a c c c c a a a a a a a a a a a a a a a a c c c c a a a a a a a a a a a a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f f c c a a a a a c c c a a a a a a a a a a a a a a a a c c c c c a a a a a a a a a a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c f f c c c a a a c c c a a a a a a a a a a a a a a c c c c c c a a a a a a a a a a a c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c c f f f c c c c c c c a a a a a a a a a a a a a c c c c c c c a a a a a a a a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c c c c c f f f c c c c c c c a a a a a a a a a c c c c c c c c c c a a a a a c c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c c c c c c c c f f f f f c c c c c c a a a a c c c c c c c c c c c c c c c c f f f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c c c c c c c c f . f c c c c c c c c c a a a c c c c c c c c c c c c c c f f c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c c c c c c c c f . . f f c c c c c c c a a a a a c c c c c c c c c c c c c c c f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c c c c c c c c f . . . . f c c c c c a a a a a a a a c c c c c c c c c c c f f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c c a a c c c c f . . . . . f c c c a a a a a a a a a a a c c c c c c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c a a a a c c c f . . . . . . f c c a a a a a a a a a a a c c c c c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c a a a a a c c f . . . . . . . f c c a a a a a a a a a a a c c c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c a a a a a c c f . . . . . . . f c c a a a a a a a a a a a c c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c a a a a a c c f . . . . . . . . f c c a a a a a a a a a a c c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a a a a a c f . . . . . . . . f c c c c c c a a c c c c c c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a a a a a c f . . . . . . . . . f c c c c c c a c c c a c c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a a a a a f . . . . . . . . . . f c c c c a c c c c a a a c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a a a a a f . . . . . . . . . . . f c a a a a c c a a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c a a a a a c f . . . . . . . . . . . f c a a a a c a a a a a a c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a a a c f . . . . . . . . . . . f a a a a a c a a a a a a c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a a c c f . . . . . . . . . . . f a a a a a c a a a a a a c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c a a a c c f . . . . . . . . . . . f a a a a c c a a a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c a a a c c f . . . . . . . . . . . . f a a a c c c c a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c a a c c c f . . . . . . . . . . . . f a a c c c c c c c a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c a a c c c f . . . . . . . . . . . . f c c c c c c c c c c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c c a a c f . . . . . . . . . . . . . f c a a c c c a a a c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c c a a c f . . . . . . . . . . . . . f a a a a c a a a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c a a a c f . . . . . . . . . . . . . f a a a a c a a a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a c f . . . . . . . . . . . . . f a a a a c a a a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f a a a a c f . . . . . . . . . . . . . f a a a a c a a a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f f a a a a a f . . . . . . . . . . . . f c a a a c c c a a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c f a a a a a f . . . . . . . . . . . . f c a a a c c c a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c f a a a a a a f f . . . . . . . . . . . f c c a c c c c c c a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c f a a a a a a f c f . . . . . . . . . . f c c c c c c c c c c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c f a a a a a a f c c f . . . . . . . . . f c c c c a a a c c c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c a f a a a a a f c c f . . . . . . . . . f c c a a a a a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c a a f a a a f a c c f . . . . . . . . . f a a a a a a a a a a c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c a a a a a a f a a a c c f . . . . . . . f c a a a a a a a a a a c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c a a a a a a a a a a c c f . . . . . . . f c a a a a a a a a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c a a a a a a a a a a c c f . . . . . . f c a a a a a a a a a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c a a a a a a a a a a c c f . . . . . . f c a a f f c a a a a a a a c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c a a a a a a a a a a c c f . . . . . f c a a a c c f c a a a a a a c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c a a a a a a a a a a c c f . . . . f c a a a a c c f f c c a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c c a a a a a a a a a c c f . . . . f c a a a a a c f f c c a a a c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c c a a a a a a a a a c c f . . . f c a a a a a c c f . f c c a a c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c c a a a a a a a a c c c f . . . f c a a a a a c f . . . f c a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c c c a a a a a a a c c c f . . f c a a a a a c c f . . . f c a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c c c c a a a a a c c c c f . . f c a a a a c c f . . . . f c a a a a c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c f f c c a a a a c c c c f . f c a a a a c c f . . . . . . f c a a a c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f f c c c c c a a c c c c f . . f c a a a a c c f . . . . . . f c a a a a c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a c c c c c c c c c f . . f c a a a c c f . . . . . . . . f c a a a c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a c c c c c c c c f . . f c a a c c f . . . . . . . . . f c a a a c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c a a a c c f a a c c c f . . f c a a c c f . . . . . . . . . f c a a a c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a a c c f a a a c c f . . f c a a c f . . . . . . . . . . f c c a a c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a a c c f c a a a c c f . . f c a a f . . . . . . . . . . . . f c a a c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a c c f c c a a a a f . . f c a a a f . . . . . . . . . . . . f c c c c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c a a f f c c c a a a a f . . f c a a c f . . . . . . . . . . . . . f c c a f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f a a c c f f c a a a a f . . f c a a c f . . . . . . . . . . . . . f a a a f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f a c c c c f a a a c f . . f c c c c c f . . . . . . . . . . . . f a a a f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f f c c c f a a a a c f . . f c c c c c f . . . . . . . . . . . . f a a a a f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c f f f c a f c c f . . . f c a a c c f . . . . . . . . . . . . f c a a a f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c f c c c f c c a f . . f c a a c f . . . . . . . . . . . . . f c a a a f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c f a f c f a f f a f . . f c a a a f . . . . . . . . . . . . . . f c a a f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c f a f c f a f a a f . . f c a a a f . . . . . . . . . . . . . . f c a a f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c f a c f a c f a c f . . f c a a a f . . . . . . . . . . . . . . f c a a f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c f c c f a c f c c f . . f c a a a f . . . . . . . . . . . . . . f c a a f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c c c f c c f c c f . . . f c a f . . . . . . . . . . . . . . . f c a a f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f f f . f f . f f . . . . f c a f . . . . . . . . . . . . . . . . f c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c f . . . . . . . . . . . . . . . . f c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c f . . . . . . . . . . . . . . . . f c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f c f . . . . . . . . . . . . . . . . f c f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f . . . . . . . . . . . . . . . . . . . f . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
`],
            300,
            true
            )
        }
        value222.place(MonsterPlace)
        MonsterPlace.ay = 1000
    }
}
// The Intro to the game as well as the title screen
function Introduction () {
    StartButton()
    scene.setBackgroundImage(img`
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 1 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 f f f f f 1 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f 1 f f f f f f f f f 1 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f 1 f f f f f f f f f f f 1 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f 1 f f f 1 1 f f f f f f f f 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f 1 f f f 1 f 1 1 1 f f f f f 1 f f f f f f f f 1 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f 1 f f f f 1 f f f f 1 1 f f f 1 f f f f f f f 1 f f 1 f f f f f f f f f f f f f f f f f 1 1 1 f f f f f f f f f f f f f f f f 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f 1 f f f f 1 f f f f f f 1 1 f 1 f f f f f f 1 1 f f f 1 f f f f f f f f f f f f f f f 1 f f f 1 f f f f 1 1 f f f f f f f f f 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f 1 f f f f 1 f f f f f f f f 1 1 f f f f f f 1 f f f f f 1 f f f f f f f f f f f f f f 1 f f f 1 f f f 1 f f 1 f f f f f f f f 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f 1 f f f f 1 f f f f f f f f f 1 f f f f f f 1 f f f f f f 1 1 f f f f f f f f f f f f 1 f f f 1 f f f 1 f f f 1 f f f f f f f 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f 1 f f f f 1 f f f f f f f f f f f f f f f 1 f f f f 1 1 f f f 1 f f f f f f f f f f f 1 f f f 1 f f f f 1 f f 1 f f f f f f f 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f 1 f f f f 1 f f f f f f f f f f f f f f f 1 f f f 1 f f 1 f f f 1 f f f f f f f f f f 1 f f f 1 f f f f 1 f f 1 f f f f f f f 1 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f 1 f f f f 1 f f f f f f f f f f f f f f f 1 f f f 1 f f f 1 f f f 1 f f f f f f f f f 1 f f f 1 f f f f 1 f f 1 f f f f f f f 1 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f 1 f f f 1 f f f f f f f f f f f f f f f 1 f f f 1 f f f f 1 f f f 1 f f f f f f f f 1 f f 1 f f f f f 1 f 1 f f f f f f f f 1 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f 1 f f 1 1 1 1 f f f f f f f f f f f f f 1 f f 1 f f f f f f 1 f f f 1 f f f f f f f 1 f f 1 f f f f f 1 f 1 f f f f f f f f 1 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f 1 f f f f f f 1 1 1 1 f f f f f f f f 1 f f f 1 f f f f f f f 1 f f f 1 1 f f f f f 1 f f 1 f f f f f 1 f 1 f f f f f f f f 1 f 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f 1 f f f f f f f f f f 1 f f f f f f f 1 f f f 1 f f f f f f f f 1 f f f f 1 f f f 1 f f f 1 f f f f f 1 f 1 f f f f f f f f 1 f 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 f f f f f f f f f 1 f f f f f f 1 f f f 1 f f f f f f f f f 1 f f f f 1 f f 1 f f f 1 f f f f f 1 f 1 f f f f f f f f 1 f 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 f f f f f f 1 f f f f f f 1 f f f 1 f f f f f f f f f f 1 f f 1 f f f 1 f f f 1 f f f f f 1 f 1 f f f f f f f f 1 f 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 f f f f 1 f f f f 1 f f f 1 f f f f f f f f f 1 1 f 1 1 f f f f 1 f f f 1 f f f f f 1 f 1 f f f f f f f f 1 f 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 f f 1 f f f f 1 f f f 1 f f f f f f f 1 1 f f 1 f f f f f f 1 f f 1 f f f f f f 1 f 1 f f f f f f f f 1 f f 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 f f 1 f f f 1 f f f 1 f f f f f 1 1 f f f 1 f f f f f f f 1 f f f 1 f f f f 1 f f 1 f f f f f f f f 1 f f 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 f f f f f f f f f 1 f 1 f f f 1 f f f 1 f f f 1 1 f f f 1 1 f f f f f f f f 1 f f f f 1 f f f 1 f f 1 f f f f f f f f 1 f f 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f 1 f 1 f f f f f f 1 1 f f 1 f f f 1 f f f 1 f 1 1 f f f f 1 f f f f f f f f f f 1 f f f f f 1 f f 1 f f 1 f f f f f f f f 1 f f 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f 1 f f 1 f f f 1 1 f f f 1 f f f f 1 f f f 1 1 f f f f 1 1 f f f f f f f f f f f f 1 f f f f f 1 f 1 f f 1 f f f f f f f f 1 f f 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 f f 1 1 1 f f f 1 1 f f f f f 1 f f 1 f f f f 1 1 f f f f f f f f f f f f f f f 1 f f f f f 1 f f f 1 f f f f f f f f 1 f f 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 f f f f f f f 1 f f f f f f f 1 f f f f f 1 1 f f f f f f f f f f f f f f f f f f 1 f f f f f f 1 1 f f f f f f f f f 1 f f 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 f f f f f 1 1 f f f f f f f f 1 f f f 1 1 f f f f f f f f f f f f f f f f f f f f f 1 1 1 1 1 1 f f f f f f f f f f f 1 f f 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 f f 1 1 f f f f f f f f f f 1 f 1 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 f f f 1 1 1 1 1 1 1 1 1 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 f f f f f f f f f f f f 1 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 f f f f f f f f f f f f f 1 1 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 f f f f f f f f f 1 1 1 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 f f f f f 1 1 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 f 1 1 1 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 1 1 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 1 1 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 1 1 1 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 f f f f f 1 1 1 1 1 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 f f 1 1 1 1 1 1 1 1 1 1 1 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 f f f f 1 1 1 1 1 1 f f 1 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 f f f f f f f f 1 1 f f 1 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 f f f f f 1 1 1 1 f f 1 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 f f f f 1 1 1 1 f f f 1 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 f f 1 1 1 f f f f f f 1 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 1 1 1 f f f f f f f f 1 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 1 f f f f f f f f f 1 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 f f f f f f f f f f 1 f f f f f f f f f f f 1 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 1 1 1 f f f f f f f f f f f f f f f f f f f f f 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 1 1 1 1 1 f f f f 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 1 1 1 1 1 1 f f f f 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 1 1 1 1 1 1 1 f f f f 1 1 f f f f f f f f f f f f f f f f f f f f f 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 1 1 1 1 1 1 1 1 1 f f f 1 1 f f f f f f f f f f f f f f f f f f f f f 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 1 f f 1 1 1 1 1 1 1 f f f 1 1 1 f f f f f f f f f f f f f f f f f f f f 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 f f f f f f f f 1 1 f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 1 f f f f f 1 1 1 1 1 f f f 1 1 1 f f f f f f f f f f f f f f f f f f f 1 1 1 f f f f f f f f f f f f f f f f f f 1 1 1 1 1 1 f f f f f f 1 1 1 f f f f f f f 1 1 f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 1 f f f f f f 1 1 1 1 f f f 1 1 1 f f f f f f f f f f f f f f f f f f f 1 1 1 1 f f f f f f f f f f f f f f f f 1 1 1 1 1 1 1 1 f f f f f 1 1 1 1 f f f f f f 1 1 f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 1 f f f f f f f f 1 1 1 f f f 1 1 1 f f f f f f f f f f f f f f f f f f f 1 1 1 1 f f f f f f f f f f f f f f 1 1 1 1 1 1 1 1 1 1 1 f f f f 1 1 1 1 1 f f f f f 1 1 f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 f f f f f f f f f f 1 f f f f 1 1 1 f f f f f f f f f f f f f f f f f f f 1 1 1 f f f f f f f f f f f f f f 1 1 1 1 f f f f f f f 1 1 1 f f f 1 1 1 1 f f f f f 1 1 f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 1 f f f f f f f f f f f f f f f 1 1 1 f f f f f f f f f f f f f f f f f f f 1 1 1 f f f f f f f f f f f f f f 1 1 1 f f f f f f f f f f f f f f 1 1 1 1 f f f f f 1 1 1 f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 1 f f f f f f f f f f f f f f f 1 1 1 f f f f f f f f f f f f f f f f f f f 1 1 1 f f f f f f f f f f f f f f 1 1 1 1 1 f f f f f f f f f f f f f 1 1 1 f f f f f f 1 1 f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 1 f f f f f f f f f f f f f f 1 1 1 f f f f f f f f f f f f f f f f f f f 1 1 1 f f f f f f f f f f f f f f f 1 1 1 1 1 1 f f f f f f f f f f f 1 1 1 1 f f f f f 1 1 f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 1 f f f f f f f f f f f f f 1 1 1 f f f f f f f f f f f f f f f f f f f 1 1 1 f f f f f f f f f f f f f f f f f 1 1 1 1 1 1 f f f f f f f f f 1 1 1 1 f f f f f 1 1 f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 1 f f f f f f f f f f f f 1 1 1 f f f f f f f f f f f f f f f f f f f 1 1 1 1 f f f f f f f f f f f f f f f f f 1 1 1 1 1 1 1 f f f f f f f f 1 1 1 f f f f f 1 1 1 f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 1 f f f f f f f f f f f f 1 1 f f f f f f f f f f f f f f f f f f 1 1 1 1 1 1 f f f f f f f f f f f f f f f f f 1 1 1 1 1 1 f f f f f f f f 1 1 1 f f f f f 1 1 1 1 f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 1 f f f f f f f f f f 1 1 f f f f f f f f f f f f f f f f f f 1 1 1 1 1 1 f f f f f f f f f f f f f f f f f f f f 1 1 1 1 f f f f f f f 1 1 1 f f 1 1 1 1 1 1 1 f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 1 1 1 1 f f f f f f 1 1 f f f f f f f f f f f f f f f f f f 1 1 1 1 1 1 1 f f f f f f f f f f f f f f f f f f f f 1 1 1 f f f f f f f f 1 1 1 1 1 1 f f 1 1 1 f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 1 1 1 f f f f f 1 1 f f f f f f f f f f f f f f f f f f 1 1 1 1 1 1 1 f f f f f f f f f f f f f f f f f f f f f 1 1 1 f f f f f f f 1 1 1 1 f f f f f 1 1 f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 1 1 f f f f 1 1 f f f f f f f f f f f f f f f f f f 1 1 1 f 1 1 1 1 f f f f f f f f f f f f f f f f f f f f 1 1 1 f f f f f f f 1 1 1 1 f f f f f 1 1 1 f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 1 f f f 1 1 1 f f f f f f f f f f f f f f f f f 1 1 1 f f 1 1 1 1 f f f f f f f f 1 f f f f f f f f f f 1 1 1 f f f f f f f f 1 1 1 f f f f f 1 1 1 f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 f f f f f f f f f f 1 1 1 1 f f f 1 1 1 f f f f f f f f f f f f f f f f f 1 1 1 f f 1 1 1 1 1 f f f f f f 1 1 f f f f f f f f f 1 1 1 1 f f f f f f f f 1 1 1 f f f f f f 1 1 1 f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 f f f f f f f f f 1 1 1 1 f f f 1 1 f f f f f f f f f f f f f f f f f f 1 1 1 f f f 1 1 1 1 f f f f f f 1 1 f f f f f f f f f 1 1 1 1 f f f f f f f f f 1 1 f f f f f f 1 1 1 f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 1 f f f f f f 1 1 1 1 f f f f f 1 1 f f f f f f f f f f f f f f f f 1 1 1 1 f 1 1 1 1 1 1 1 f f f f f 1 1 f f f f f f f f f 1 1 1 1 f f f f f f f f f 1 1 1 f f f f f f 1 1 1 f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 1 f f f f 1 1 1 1 f f f f f f 1 1 1 1 1 1 1 f f f f f f f f f f f 1 1 1 1 1 1 1 1 1 1 1 1 1 f f f f 1 1 1 1 f f f f f f 1 1 1 1 f f f f f f f f f f 1 1 1 f f f f f f 1 1 1 f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 1 1 f 1 1 1 1 f f f f f f f 1 1 1 1 1 1 1 1 1 f f f f f f f f f 1 1 1 1 1 1 1 f 1 1 1 1 1 f f f f f 1 1 1 1 1 1 1 1 1 1 1 1 f f f f f f f f f f f 1 1 1 f f f f f f f 1 1 1 f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 1 1 1 1 1 f f f f f f f f f f f f 1 1 1 1 1 1 1 f f f f f f f 1 1 1 1 f f f f f 1 1 1 1 1 f f f f f f 1 1 1 1 1 1 1 1 f f f f f f f f f f f f f 1 1 1 f f f f f f f 1 1 1 f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 1 f f f f f f f f f f f f f f f f 1 1 1 1 1 1 1 f f f f f 1 1 f f f f f f f f 1 1 1 1 f f f f f f f f f 1 1 1 f f f f f f f f f f f f f f f f 1 f f f f f f f f f 1 1 f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 1 f f f f f f f f f f 1 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 f f f f f f f f f 1 1 f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 f f f f f f f f f f f f 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 f f f f f f f f f f 1 f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 1 f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
`)
    game.showLongText("                            Press Any Button", DialogLayout.Bottom)
    scene.setBackgroundImage(img`
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
`)
    pause(500)
    game.showLongText("                                                            Does your voice begin to burn?", DialogLayout.Center)
    game.showLongText("                                                            Did your ears begin to bleed?", DialogLayout.Center)
    game.showLongText("                                                            Were you so blind you could not see?", DialogLayout.Center)
    game.showLongText("                                            In Nightmare now you sleep. With mind and body severed.", DialogLayout.Center)
    game.showLongText("                                                            You as Soul & Slash.", DialogLayout.Center)
    pause(500)
    game.splash("Use the \"LEFT\" and \"RIGHT\"", "buttons to move around.")
    game.splash("Use the \"UP\"", "button to jump.")
    game.splash("Use the \"DOWN\" button", "to interact.")
    game.splash("Press \"B\" to switch", " between Soul and Slash.")
    ChatBox()
}
// Gain points when a token is taken
sprites.onOverlap(SpriteKind.Player, SpriteKind.Points, function (sprite, otherSprite) {
    otherSprite.destroy(effects.coolRadial, 1000)
    info.changeScoreBy(10)
    music.baDing.play()
})
// Pressing Down will active Story tiles when player
//
//
// overlaps
sprites.onOverlap(SpriteKind.Player, SpriteKind.InteractiveStory, function (sprite, otherSprite) {
    if (HeroPlayer.overlapsWith(otherSprite)) {
        otherSprite.say("!", 500)
        if (controller.down.isPressed()) {
            if (NextLevel == 1) {
                game.showLongText("To those trapped in Nightmare...", DialogLayout.Bottom)
                game.showLongText("Weaken your body becomes as you slip further away into sleep.", DialogLayout.Bottom)
            } else if (NextLevel == 2) {
                game.showLongText("To those trapped in Nightmare...", DialogLayout.Bottom)
                game.showLongText("Fatigue coursing through you form, eyes flickering like a dead bulb.", DialogLayout.Bottom)
            } else if (NextLevel == 3) {
                game.showLongText("To those trapped in Nightmare...", DialogLayout.Bottom)
                game.showLongText("Speak slowly, they won't hear you.", DialogLayout.Bottom)
            } else if (NextLevel == 4) {
                game.showLongText("To those trapped in Nightmare...", DialogLayout.Bottom)
                game.showLongText("The temptation pain will calm the mind, but agitate the body.", DialogLayout.Bottom)
            } else if (NextLevel == 5) {
                game.showLongText("To you who's trapped in Nightmare...", DialogLayout.Bottom)
                game.showLongText("The world await your return. So to not die- to sleep no more- to awaken at the sun's beckoning.", DialogLayout.Bottom)
                game.showLongText("Rise to the new dawn, awaken. Tired eyes rest no longer. awaken.", DialogLayout.Bottom)
                game.showLongText("Does the ramblings of a man speak no louder than a whimper?", DialogLayout.Bottom)
                game.showLongText("Does thy voice no longer hold the weight it once held?", DialogLayout.Bottom)
                game.showLongText("Rise now. The world awaits.", DialogLayout.Bottom)
                info.changeScoreBy(info.score() * info.life())
                game.over(true, effects.splatter)
            }
        }
    } else {
    	
    }
})
// Damage is taken when player touches a damage sprite
sprites.onOverlap(SpriteKind.Player, SpriteKind.Damage, function (sprite, otherSprite) {
    HeroPlayer.startEffect(effects.fire, 1000)
    pause(400)
    info.player2.changeScoreBy(-1)
})
// Allows the player to jump
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (SlashActive == true) {
        if (HeroPlayer.isHittingTile(CollisionDirection.Bottom) == true) {
            HeroPlayer.vy = -75
        }
        if (ClimbLeftWall == false && HeroPlayer.isHittingTile(CollisionDirection.Left)) {
            ClimbLeftWall = true
            ClimbRightWall = false
            HeroPlayer.vy = -60
        } else if (ClimbRightWall == false && HeroPlayer.isHittingTile(CollisionDirection.Right)) {
            ClimbRightWall = true
            ClimbLeftWall = false
            HeroPlayer.vy = -60
        }
    } else if (SoulActive == true) {
        ClimbRightWall = false
        ClimbRightWall = false
        if (HeroPlayer.isHittingTile(CollisionDirection.Bottom) == true) {
            HeroPlayer.vy = -75
            DoubleJump = true
        } else if (DoubleJump == true) {
            HeroPlayer.vy = -100
            HeroPlayer.startEffect(effects.bubbles, 500)
            DoubleJump = false
        }
    }
})
// Changes the text box for the start button
function StartButton () {
    game.setDialogFrame(img`
. . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . 
`)
    game.setDialogCursor(img`
. . . . . . . . 
. . . . . . . . 
. . . . . . . . 
. . . . . . . . 
. . . . . . . . 
. . . . . . . . 
. . . . . . . . 
. . . . . . . . 
`)
    game.setDialogTextColor(1)
}
// Slash's left face animation
function SlashLeftFace () {
    SlashLeftWalk = animation.createAnimation(ActionKind.SlashLeftWalk, 150)
    animation.attachAnimation(HeroPlayer, SlashLeftWalk)
    SlashLeftWalk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f 1 1 1 1 3 3 3 3 f f 2 2 f . . . . . . . 
. . . . . . . . . . f 1 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . . 
. . . . . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . 
. . . . . . . . f f f f f f f f f f f 3 3 3 3 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 f f 2 2 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 3 f f 2 f 2 f . . . . . 
. . . . . . . . f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f 2 2 f . . . . . 
. . . . . . . . . f 2 f f f f f f f f f f 2 2 3 f 2 f . . . . . 
. . . . . . . . . . f c 8 9 8 9 9 9 9 9 8 f f 2 f 2 f . . . . . 
. . . . . . . . . . . b 1 8 9 8 9 8 9 9 9 8 b f f 2 f . . . . . 
. . . . . . . . . . . b f f 8 8 9 9 8 9 9 8 b 9 8 f . . . . . . 
. . . . . . . . . . . b f f d b 8 9 8 9 9 8 9 9 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 8 9 1 8 9 9 8 . . . . . . . 
. . . . . . . . . . . f d d d d d b 8 9 8 9 9 9 9 8 . . . . . . 
. . . . . . . . . . . . f d d d d d b 8 f 9 9 8 8 . . . . . . . 
. . . . . . . . . . . . . f f f f f f f . 8 8 . . . . . . . . . 
. . . . . . . . . . . . . . . f b f f . . . 8 . . . . . . . . . 
. . . . . . . . . . . . . . f f f 1 1 f f . . . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 1 2 2 2 2 f . . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 2 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 c 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . . f f 2 2 2 2 c 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . f c f 2 2 2 2 c 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . f c f 1 1 1 1 1 c d d c . . . . . . . . . 
. . . . . . . . . . . f b f 1 1 1 1 1 c b d c . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f c c . . . . . . . . . . 
. . . . . . . . . . . . . f 8 8 f 8 6 6 f . . . . . . . . . . . 
. . . . . . . . . . . . . f 8 8 f 8 6 6 f . . . . . . . . . . . 
. . . . . . . . . . . . . f f f f f f f f . . . . . . . . . . . 
. . . . . . . . . . . . . . f f . . f f . . . . . . . . . . . . 
`)
    SlashLeftWalk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f 1 1 1 1 3 3 3 3 f f 2 2 f . . . . . . . 
. . . . . . . . . . f 1 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . . 
. . . . . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . 
. . . . . . . . f f f f f f f f f f f 3 3 3 3 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 f f 2 2 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 3 f f 2 f 2 f . . . . . 
. . . . . . . . f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f 2 2 f . . . . . 
. . . . . . . . . f 2 f f f f f f f f f f 2 2 3 f 2 f . . . . . 
. . . . . . . . . . f c 8 9 8 9 9 9 9 9 8 f f 2 f 2 f . . . . . 
. . . . . . . . . . . b 1 8 9 8 9 9 9 9 9 8 b f f 2 f . . . . . 
. . . . . . . . . . . b f f 8 8 9 8 9 9 9 8 b 9 8 f . . . . . . 
. . . . . . . . . . . b f f d b 8 9 8 9 9 8 9 9 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 8 9 1 8 9 9 8 . . . . . . . 
. . . . . . . . . . . f d d d d d b b 8 9 8 9 9 9 8 . . . . . . 
. . . . . . . . . . . . f d d d d d d b 8 9 9 8 8 . . . . . . . 
. . . . . . . . . . . . . f f f f f f f f 8 8 . . . . . . . . . 
. . . . . . . . . . . . . . f f f 1 1 2 2 f 8 . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 1 2 2 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 2 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 c 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 c 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . . f f 2 2 2 c 2 2 2 f . . . . . . . . . . 
. . . . . . . . . . . . f f 1 1 1 c d d 2 f . . . . . . . . . . 
. . . . . . . . . . . . f f 1 1 1 c b d c . . . . . . . . . . . 
. . . . . . . . . . . . . . f f f f c c . . . . . . . . . . . . 
. . . . . . . . . . . . . . f f 8 6 6 f . . . . . . . . . . . . 
. . . . . . . . . . . . . . f f f f f f . . . . . . . . . . . . 
. . . . . . . . . . . . . . . f f f f . . . . . . . . . . . . . 
`)
    SlashLeftWalk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f 1 1 1 1 3 3 3 3 f f 2 2 f . . . . . . . 
. . . . . . . . . . f 1 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . . 
. . . . . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . 
. . . . . . . . f f f f f f f f f f f 3 3 3 3 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 f f 2 2 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 3 f f 2 f 2 f . . . . . 
. . . . . . . . f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f 2 2 f . . . . . 
. . . . . . . . . f 2 f f f f f f f f f f 2 2 3 f 2 f . . . . . 
. . . . . . . . . . f c 8 9 8 9 9 9 9 9 8 f f 2 f 2 f . . . . . 
. . . . . . . . . . . b 1 8 9 8 9 8 9 9 9 8 b f f 2 f . . . . . 
. . . . . . . . . . . b f f 8 8 9 9 8 9 9 8 b 9 8 f . . . . . . 
. . . . . . . . . . . b f f d b 8 9 8 9 9 8 9 9 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 8 9 1 8 9 9 8 . . . . . . . 
. . . . . . . . . . . f d d d d d b 8 9 8 9 9 9 9 8 . . . . . . 
. . . . . . . . . . . . f d d d d d b 8 f 9 9 8 8 . . . . . . . 
. . . . . . . . . . . . . f f f f f f f . 8 8 . . . . . . . . . 
. . . . . . . . . . . . . . . f b f f . . . 8 . . . . . . . . . 
. . . . . . . . . . . . . . f f f 1 1 f f . . . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 1 2 2 2 2 f . . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 2 2 2 f . . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 c 2 2 f . . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 c 2 2 2 f . . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 c 2 2 2 2 c . . . . . . . . . . 
. . . . . . . . . . . . . f 1 c d d 2 2 c . . . . . . . . . . . 
. . . . . . . . . . . . . f 1 c b d 2 c f . . . . . . . . . . . 
. . . . . . . . . . . . . f f f c c f f f . . . . . . . . . . . 
. . . . . . . . . . . . . . f 8 6 6 f f . . . . . . . . . . . . 
. . . . . . . . . . . . . . f 8 6 6 f f . . . . . . . . . . . . 
. . . . . . . . . . . . . . f f f f f f . . . . . . . . . . . . 
. . . . . . . . . . . . . . . f f f f . . . . . . . . . . . . . 
`)
    SlashLeftWalk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f 1 1 1 1 3 3 3 3 f f 2 2 f . . . . . . . 
. . . . . . . . . . f 1 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . . 
. . . . . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . 
. . . . . . . . f f f f f f f f f f f 3 3 3 3 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 f f 2 2 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 3 f f 2 f 2 f . . . . . 
. . . . . . . . f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f 2 2 f . . . . . 
. . . . . . . . . f 2 f f f f f f f f f f 2 2 3 f 2 f . . . . . 
. . . . . . . . . . f c 8 9 8 9 9 9 9 9 8 f f 2 f 2 f . . . . . 
. . . . . . . . . . . b 1 8 9 8 9 9 9 9 9 8 b f f 2 f . . . . . 
. . . . . . . . . . . b f f 8 8 9 8 9 9 9 8 b 9 8 f . . . . . . 
. . . . . . . . . . . b f f d b 8 9 8 9 9 8 9 9 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 8 9 1 8 9 9 8 . . . . . . . 
. . . . . . . . . . . f d d d d d b b 8 9 8 9 9 9 8 . . . . . . 
. . . . . . . . . . . . f d d d d d d b 8 9 9 8 8 . . . . . . . 
. . . . . . . . . . . . . f f f f f f f f 8 8 . . . . . . . . . 
. . . . . . . . . . . . . . f f f 1 1 2 2 f 8 . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 1 2 2 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 2 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 c 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 c 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . . f f 2 2 2 c 2 2 2 f . . . . . . . . . . 
. . . . . . . . . . . . f f 1 1 1 c d d 2 f . . . . . . . . . . 
. . . . . . . . . . . . f f 1 1 1 c b d c . . . . . . . . . . . 
. . . . . . . . . . . . . f f f f f c c f . . . . . . . . . . . 
. . . . . . . . . . . . . f 8 6 6 f 8 8 f . . . . . . . . . . . 
. . . . . . . . . . . . . f f f f f f f f . . . . . . . . . . . 
. . . . . . . . . . . . . . f f . . f f . . . . . . . . . . . . 
`)
    SlashLeftWalk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f 1 1 1 1 3 3 3 3 f f 2 2 f . . . . . . . 
. . . . . . . . . . f 1 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . . 
. . . . . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . 
. . . . . . . . f f f f f f f f f f f 3 3 3 3 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 f f 2 2 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 3 f f 2 f 2 f . . . . . 
. . . . . . . . f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f 2 2 f . . . . . 
. . . . . . . . . f 2 f f f f f f f f f f 2 2 3 f 2 f . . . . . 
. . . . . . . . . . f c 8 9 8 9 9 9 9 9 8 f f 2 f 2 f . . . . . 
. . . . . . . . . . . b 1 8 9 8 9 8 9 9 9 8 b f f 2 f . . . . . 
. . . . . . . . . . . b f f 8 8 9 9 8 9 9 8 b 9 8 f . . . . . . 
. . . . . . . . . . . b f f d b 8 9 8 9 9 8 9 9 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 8 9 1 8 9 9 8 . . . . . . . 
. . . . . . . . . . . f d d d d d b 8 9 8 9 9 9 9 8 . . . . . . 
. . . . . . . . . . . . f d d d d d b 8 f 9 9 8 8 . . . . . . . 
. . . . . . . . . . . . . f f f f f f f . 8 8 . . . . . . . . . 
. . . . . . . . . . . . . . . f b f f . . . 8 . . . . . . . . . 
. . . . . . . . . . . . . . f f f 1 1 f f . . . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 1 2 2 2 2 f . . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 2 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 c 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . . f f 2 2 2 2 c 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . f c f 2 2 2 2 c 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . f c f 1 1 1 1 1 c d d c . . . . . . . . . 
. . . . . . . . . . . f b f 1 1 1 1 1 c b d c . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f c c . . . . . . . . . . 
. . . . . . . . . . . . . . f 8 6 6 f f . . . . . . . . . . . . 
. . . . . . . . . . . . . . f 8 6 6 f f . . . . . . . . . . . . 
. . . . . . . . . . . . . . f f f f f f . . . . . . . . . . . . 
. . . . . . . . . . . . . . . f f f f . . . . . . . . . . . . . 
`)
    SlashLeftWalk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f 1 1 1 1 3 3 3 3 f f 2 2 f . . . . . . . 
. . . . . . . . . . f 1 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . . 
. . . . . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . 
. . . . . . . . f f f f f f f f f f f 3 3 3 3 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 f f 2 2 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 3 f f 2 f 2 f . . . . . 
. . . . . . . . f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f 2 2 f . . . . . 
. . . . . . . . . f 2 f f f f f f f f f f 2 2 3 f 2 f . . . . . 
. . . . . . . . . . f c 8 9 8 9 9 9 9 9 8 f f 2 f 2 f . . . . . 
. . . . . . . . . . . b 1 8 9 8 9 9 9 9 9 8 b f f 2 f . . . . . 
. . . . . . . . . . . b f f 8 8 9 8 9 9 9 8 b 9 8 f . . . . . . 
. . . . . . . . . . . b f f d b 8 9 8 9 9 8 9 9 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 8 9 1 8 9 9 8 . . . . . . . 
. . . . . . . . . . . f d d d d d b b 8 9 8 9 9 9 8 . . . . . . 
. . . . . . . . . . . . f d d d d d d b 8 9 9 8 8 . . . . . . . 
. . . . . . . . . . . . . f f f f f f f f 8 8 . . . . . . . . . 
. . . . . . . . . . . . . . f f f 1 1 2 2 f 8 . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 1 2 2 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 2 2 2 2 2 f . . . . . . . . 
. . . . . . . . . . . . f f 2 2 2 2 2 c 2 2 2 2 f . . . . . . . 
. . . . . . . . . . . f c f 2 2 2 2 2 2 c 2 2 2 2 f . . . . . . 
. . . . . . . . . . f 2 c f 2 2 2 2 2 2 2 c 2 d d c . . . . . . 
. . . . . . . . . . f b c f 1 1 1 1 1 1 1 f c d b c . . . . . . 
. . . . . . . . . . f d b f 1 1 1 1 1 1 1 f . c c . . . . . . . 
. . . . . . . . . . . f f f f f f f f f f . . . . . . . . . . . 
. . . . . . . . . . . . . . f f 8 6 6 f . . . . . . . . . . . . 
. . . . . . . . . . . . . . f f f f f f . . . . . . . . . . . . 
. . . . . . . . . . . . . . . f f f f . . . . . . . . . . . . . 
`)
    SlashLeftIdle = animation.createAnimation(ActionKind.SlashLeftIdle, 250)
    animation.attachAnimation(HeroPlayer, SlashLeftIdle)
    SlashLeftIdle.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f 1 1 1 1 3 3 3 3 f f 2 2 f . . . . . . . 
. . . . . . . . . . f 1 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . . 
. . . . . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . 
. . . . . . . . f f f f f f f f f f f 3 3 3 3 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 f f 2 2 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 3 f f 2 f 2 f . . . . . 
. . . . . . . . f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f 2 2 f . . . . . 
. . . . . . . . . f 2 f f f f f f f f f f 2 2 3 f 2 f . . . . . 
. . . . . . . . . . f c 8 9 8 9 9 9 9 9 8 f f 2 f 2 f . . . . . 
. . . . . . . . . . . b 1 8 9 8 9 8 9 9 9 8 b f f 2 f . . . . . 
. . . . . . . . . . . b f f 8 8 9 9 8 9 9 8 b 9 8 f . . . . . . 
. . . . . . . . . . . b f f d b 8 9 8 9 9 8 9 9 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 8 9 1 8 9 9 8 . . . . . . . 
. . . . . . . . . . . f d d d d d b 8 9 8 9 9 9 9 8 . . . . . . 
. . . . . . . . . . . . f d d d d d b 8 f 9 9 8 8 . . . . . . . 
. . . . . . . . . . . . . f f f f f f f . 8 8 . . . . . . . . . 
. . . . . . . . . . . . . . . f b f f . . . 8 . . . . . . . . . 
. . . . . . . . . . . . . . f f f 1 1 f f . . . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 1 2 2 2 2 f . . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 2 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 c 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . . f f 2 2 2 2 c 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . f c f 2 2 2 2 c 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . f c f 1 1 1 1 1 c d d c . . . . . . . . . 
. . . . . . . . . . . f b f 1 1 1 1 1 c b d c . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f c c . . . . . . . . . . 
. . . . . . . . . . . . . f 8 8 f 8 6 6 f . . . . . . . . . . . 
. . . . . . . . . . . . . f 8 8 f 8 6 6 f . . . . . . . . . . . 
. . . . . . . . . . . . . f f f f f f f f . . . . . . . . . . . 
. . . . . . . . . . . . . . f f . . f f . . . . . . . . . . . . 
`)
    SlashLeftIdle.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f 1 1 1 1 3 3 3 3 f f 2 2 f . . . . . . . 
. . . . . . . . . . f 1 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . . 
. . . . . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . 
. . . . . . . . f f f f f f f f f f f 3 3 3 3 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 f f 2 2 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 3 f f 2 f 2 f . . . . . 
. . . . . . . . f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f 2 2 f . . . . . 
. . . . . . . . . f 2 f f f f f f f f f f 2 2 3 f 2 f . . . . . 
. . . . . . . . . . f c 8 9 8 9 9 9 9 9 8 f f 2 f 2 f . . . . . 
. . . . . . . . . . . b 1 8 9 8 9 9 9 9 9 8 b f f 2 f . . . . . 
. . . . . . . . . . . b f f 8 8 9 8 9 9 9 8 b 9 8 f . . . . . . 
. . . . . . . . . . . b f f d b 8 9 8 9 9 8 9 9 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 8 9 1 8 9 9 8 . . . . . . . 
. . . . . . . . . . . f d d d d d b b 8 9 8 9 9 9 8 . . . . . . 
. . . . . . . . . . . . f d d d d d d b 8 9 9 8 8 . . . . . . . 
. . . . . . . . . . . . . f f f f f f f f 8 8 . . . . . . . . . 
. . . . . . . . . . . . . . f f f 1 1 2 2 f 8 . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 1 2 2 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 2 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 c 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . . f f 2 2 2 2 c 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . f c f 2 2 2 2 c 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . f c f 1 1 1 1 1 c d d c . . . . . . . . . 
. . . . . . . . . . . f b f 1 1 1 1 1 c b d c . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f c c . . . . . . . . . . 
. . . . . . . . . . . . . f 8 8 f 8 6 6 f . . . . . . . . . . . 
. . . . . . . . . . . . . f f f f f f f f . . . . . . . . . . . 
. . . . . . . . . . . . . . f f . . f f . . . . . . . . . . . . 
`)
    SlashLeftWalkingAtk = animation.createAnimation(ActionKind.SlashLeftWalkAtk, 120)
    animation.attachAnimation(HeroPlayer, SlashLeftWalkingAtk)
    SlashLeftWalkingAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f 1 1 1 1 3 3 3 3 f f 2 2 f . . . . . . . 
. . . . . . . . . . f 1 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . . 
. . . . . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . 
. . . . . . . . f f f f f f f f f f f 3 3 3 3 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 f f 2 2 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 3 f f 2 f 2 f . . . . . 
. . . . . . . . f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f 2 2 f . . . . . 
. . . . . . . . . f 2 f f f f f f f f f f 2 2 3 f 2 f . . . . . 
. . . . . . . . . . f c 8 9 8 9 9 9 9 9 8 f f 2 f 2 f . . . . . 
. . . . . . . . . . . b 1 8 9 8 9 9 9 9 9 8 b f f 2 f . . . . . 
. . . . . . . . . . . b f f 8 8 9 8 9 9 9 8 b 9 8 f . . . . . . 
. . . . . . . . . . . b f f d b 8 9 8 9 9 8 9 9 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 8 9 1 8 9 9 8 . . . . . . . 
. . . . . . . . . . . f d d d d d b b 8 9 8 9 9 9 8 . . . . . . 
. . . . . . . . . . . . f d d d d d d b 8 9 9 8 8 . . . . . . . 
. . . . . . . . . . . . . f f f f f f f f 8 8 . . . . . . . . . 
. . . . . . . . . . . . . . f f f 1 1 2 2 f 8 . . . . . . . . . 
. . . . . . . . . . . . f f 2 2 1 2 2 2 2 2 f . . . . . . . . . 
. . . . . . . . . . c c c f 2 2 2 2 2 c 2 2 2 f . . . . . . . . 
. . . . . . . . . c d d c f 2 2 2 2 2 2 c 2 2 2 f . . . . . . . 
. . . . . . . . . c d b f f 2 2 2 2 2 2 2 c 2 2 2 f . . . . . . 
. . . . . . . . . . c c . f 2 2 2 2 2 2 2 f c d d c . . . . . . 
. . . . . . . . . . . . . f 1 1 1 1 1 1 1 f c d f f . . . . . . 
. . . . . . . . . . . . . f f f f f f f f . . c f e f . . . . . 
. . . . . . . . . . . . . f 8 8 f 8 6 6 f . . . . f 1 f . . . . 
. . . . . . . . . . . . . f 8 8 f 8 6 6 f . . . . . f 1 f . . . 
. . . . . . . . . . . . . f f f f f f f f . . . . . . f 1 f . . 
. . . . . . . . . . . . . . f f . . f f . . . . . . . . f f . . 
`)
    SlashLeftWalkingAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f 1 1 1 1 3 3 3 3 f f 2 2 f . . . . . . . 
. . . . . . . . . . f 1 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . . 
. . . . . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . 
. . . . . . . . f f f f f f f f f f f 3 3 3 3 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 f f 2 2 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 3 f f 2 f 2 f . . . . . 
. . . . . . . . f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f 2 2 f . . . . . 
. . . . . . . . . f 2 f f f f f f f f f f 2 2 3 f 2 f . . . . . 
. . . . . . . . . . f c c 8 8 9 9 9 9 9 8 f f 2 f 2 f . . . . . 
. . . . . . . . . . . b 1 8 9 8 9 9 9 9 9 8 b f f 2 f . . . . . 
. . . . . . . . . . . b f f 8 8 9 9 9 9 9 8 b 9 8 f . . . . . . 
. . . . . . . . . . . b f f d b 8 9 8 9 9 9 8 9 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 9 8 1 9 9 8 9 8 . . . . . . 
. . . . . . . . . . . f d d d d d b 8 8 8 8 8 9 8 . . . . . . . 
. . . . . . . . . . . . f d d d d f f f 8 9 9 8 . . . . . . . . 
. . . . . . . . . . . . . f f f f 1 1 2 2 f f . . . . . . . . . 
. . . . . . . . . . . . f f 2 2 1 2 2 2 2 2 2 f c . . . . . . . 
. . . . . . . . . . . c c f 2 2 2 2 2 2 c 2 2 2 d c . . . . . . 
. . . . . . . . . . c d d c 2 2 2 2 2 2 2 c c 2 d f f . . . . . 
. . . . . . . . . . c d b f 2 2 2 2 2 2 2 f . c c f e f . . . . 
. . . . . . . . . . . c c f 1 1 1 1 1 1 1 f . . . c f 1 f . . . 
. . . . . . . . . . . . . f f f f f f f f . . . . . . f 1 f . . 
. . . . . . . . . . . . . . f f 8 6 6 f . . . . . . . . f 1 f . 
. . . . . . . . . . . . . . f f f f f f . . . . . . . . . f f . 
. . . . . . . . . . . . . . . f f f f . . . . . . . . . . . . . 
`)
    SlashLeftWalkingAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f 1 1 1 1 3 3 3 3 f f 2 2 f . . . . . . . 
. . . . . . . . . . f 1 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . . 
. . . . . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . 
. . . . . . . . f f f f f f f f f f f 3 3 3 3 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 f f 2 2 3 f 2 f . . . . . 
. . . . . . . f f 3 3 3 3 3 3 3 3 3 3 3 3 f f 2 f 2 f . . . . . 
. . . . . . . f 1 f 3 2 2 2 2 2 2 2 2 2 2 3 3 f 2 2 f . . . . . 
. . . . . . . f 1 f 2 f f f f f f f f f f 2 2 3 f 2 f . . . . . 
. . . . . . . . f 1 f c 8 9 8 9 9 9 9 9 8 f f 2 f 2 f . . . . . 
. . . . . . . . . f 1 f 1 8 9 8 9 9 9 9 9 8 b f f 2 f . . . . . 
. . . . . . . . . . f e f c 8 8 9 8 9 9 9 8 b 9 8 f . . . . . . 
. . . . . . . . . . . f f d f b 8 9 8 9 9 8 9 9 8 . . . . . . . 
. . . . . . . . . . . c d d 2 f f 8 8 9 1 8 9 9 9 8 . . . . . . 
. . . . . . . . . . . . c 2 2 2 2 f f 8 9 8 9 9 8 . . . . . . . 
. . . . . . . . . . . . f c 2 2 2 2 2 f f 9 9 8 . . . . . . . . 
. . . . . . . . . . . c c f c 2 2 2 2 2 2 f 8 . . . . . . . . . 
. . . . . . . . . . c d b c 2 c c 2 2 2 2 f . 8 . . . . . . . . 
. . . . . . . . . . c d d f 2 2 2 c c 2 2 f . . . . . . . . . . 
. . . . . . . . . . . c c f 2 2 2 2 2 2 2 f . . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 2 2 2 f . . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 2 2 2 f . . . . . . . . . . 
. . . . . . . . . . . . . f 1 1 1 1 1 1 1 f . . . . . . . . . . 
. . . . . . . . . . . . . f f f f f f f f . . . . . . . . . . . 
. . . . . . . . . . . . . . f 8 6 6 f f . . . . . . . . . . . . 
. . . . . . . . . . . . . . f f f f f f . . . . . . . . . . . . 
. . . . . . . . . . . . . . . f f f f . . . . . . . . . . . . . 
`)
    SlashLeftWalkingAtk.addAnimationFrame(img`
. . . 1 1 1 1 1 1 1 1 1 1 . . . . . . . . . . . . . . . . . . . 
. . 1 1 1 1 1 1 1 1 1 . . . . . . . . . . . . . . . . . . . . . 
. 1 1 1 1 1 1 1 1 1 . . f f f f f f f f f f f f . . . . . . . . 
. 1 1 1 1 1 1 1 1 . . f 1 1 1 1 3 3 3 3 f f 2 2 f . . . . . . . 
1 1 1 1 1 1 1 1 1 . f 1 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . . 
1 1 1 1 1 1 1 1 1 . f 3 3 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . 
1 1 1 1 1 1 1 1 f f f f f f f f f f f 3 3 3 3 3 f 2 f . . . . . 
1 1 1 1 1 1 1 f 1 f 3 3 3 3 3 3 3 3 3 f f 2 2 3 f 2 f . . . . . 
1 1 1 1 1 1 1 f 1 f 3 3 3 3 3 3 3 3 3 3 3 f f 2 f 2 f . . . . . 
1 1 1 1 1 1 1 1 f 1 f 2 2 2 2 2 2 2 2 2 2 3 3 f 2 2 f . . . . . 
1 1 1 1 1 1 1 1 f 1 f f f f f f f f f f f 2 2 3 f 2 f . . . . . 
1 1 1 1 1 1 1 1 1 f 1 f 8 9 8 9 9 9 9 9 8 f f 2 f 2 f . . . . . 
1 1 1 1 1 1 1 1 1 1 f b f c 9 8 9 9 9 9 9 8 b f f 2 f . . . . . 
1 1 1 1 1 1 1 1 1 1 . f f d f 8 9 9 9 9 9 8 b 9 8 f . . . . . . 
1 1 1 1 1 1 1 1 1 . . c d d 2 f 8 9 8 9 9 9 8 9 8 . . . . . . . 
1 1 1 1 1 1 1 1 1 . . b c 2 2 2 f 8 9 8 1 9 9 8 8 . . . . . . . 
1 1 1 1 1 1 1 1 1 . . f c 2 2 2 2 f 8 8 8 8 8 9 9 8 . . . . . . 
1 1 1 1 1 1 1 1 1 1 . . f c 2 2 2 2 f 8 8 9 9 8 8 . . . . . . . 
1 1 1 1 1 1 1 1 1 1 1 1 . c 2 2 2 2 2 f . 8 8 . . . . . . . . . 
1 1 1 1 1 1 1 1 1 1 1 1 1 f c 2 2 2 2 2 f . 8 . . . . . . . . . 
1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 c 2 2 2 2 2 f . . . . . . . . . . 
. 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 c 2 2 2 2 f . . . . . . . . . . 
. 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 c c 2 2 f . . . . . . . . . . 
. . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 2 f . . . . . . . . . . 
. . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 f . . . . . . . . . . 
. . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . . . . . 
. . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . . . 
. . . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . . 
. . . . . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . 
. . . . . . . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . 
. . . . . . . . . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
. . . . . . . . . . . . . . f f 1 1 1 1 1 1 1 1 1 1 1 1 . . . . 
`)
    SlashLeftWalkingAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f 1 1 1 1 3 3 3 3 f f 2 2 f . . . . . . . 
. . . . . . . . . . f 1 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . . 
. . . . . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . 
. . . . . . 1 1 f f f f f f f f f f f 3 3 3 3 3 f 2 f . . . . . 
. . . . . 1 1 f 3 3 3 3 3 3 3 3 3 3 3 f f 2 2 3 f 2 f . . . . . 
. . . . 1 1 1 f f 3 3 3 3 3 3 3 3 3 3 3 3 f f 2 f 2 f . . . . . 
. . . . 1 1 1 f 1 f 3 2 2 2 2 2 2 2 2 2 2 3 3 f 2 2 f . . . . . 
. . . 1 1 1 1 f 1 f 2 f f f f f f f f f f 2 2 3 f 2 f . . . . . 
. . . 1 1 1 1 1 f 1 f c 8 9 8 9 9 9 9 9 8 f f 2 f 2 f . . . . . 
. . . 1 1 1 1 1 1 f 1 f 1 8 9 8 9 9 9 9 9 8 b f f 2 f . . . . . 
. . . 1 1 1 1 1 1 1 f e f c 8 8 9 8 9 9 9 8 b 9 8 f . . . . . . 
. . . 1 1 1 1 1 1 1 . f f d f b 8 9 8 9 9 8 9 9 8 . . . . . . . 
. . . 1 1 1 1 1 1 1 1 c d d 2 f f 8 8 9 1 8 9 9 9 8 . . . . . . 
. . . 1 1 1 1 1 1 1 1 . c 2 2 2 2 f f 8 9 8 9 9 8 . . . . . . . 
. . . . 1 1 1 1 1 1 1 . f c 2 2 2 2 2 f f 8 9 8 . . . . . . . . 
. . . . 1 1 1 1 1 1 1 c c f c 2 2 2 2 2 2 f 8 . . . . . . . . . 
. . . . . 1 1 1 1 1 1 1 b c 2 c c 2 2 2 2 f . 8 . . . . . . . . 
. . . . . . 1 1 1 1 1 1 d f 2 2 2 c c 2 2 f . . . . . . . . . . 
. . . . . . 1 1 1 1 1 1 c f 2 2 2 2 2 2 2 f . . . . . . . . . . 
. . . . . . . 1 1 1 1 1 1 f 2 2 2 2 2 2 2 f . . . . . . . . . . 
. . . . . . . . . 1 1 1 1 f 1 1 1 1 1 1 1 f . . . . . . . . . . 
. . . . . . . . . . . . 1 1 f f f f f f f . . . . . . . . . . . 
. . . . . . . . . . . . . . f 8 6 6 f f . . . . . . . . . . . . 
. . . . . . . . . . . . . . f 8 6 6 f f . . . . . . . . . . . . 
. . . . . . . . . . . . . . f f f f f f . . . . . . . . . . . . 
. . . . . . . . . . . . . . . f f f f . . . . . . . . . . . . . 
`)
    SlashLeftWalkingAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f 1 1 1 1 3 3 3 3 f f 2 2 f . . . . . . . 
. . . . . . . . . . f 1 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . . 
. . . . . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . 
. . . . . . . . f f f f f f f f f f f 3 3 3 3 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 f f 2 2 3 f 2 f . . . . . 
. . . . . . . f f 3 3 3 3 3 3 3 3 3 3 3 3 f f 2 f 2 f . . . . . 
. . . . . . . f 1 f 3 2 2 2 2 2 2 2 2 2 2 3 3 f 2 2 f . . . . . 
. . . . . . . f 1 f 2 f f f f f f f f f f 2 2 3 f 2 f . . . . . 
. . . . . . . . f 1 f c 8 9 8 9 9 9 9 9 8 f f 2 f 2 f . . . . . 
. . . . . . . . . f 1 f 1 8 9 8 9 8 9 9 9 8 b f f 2 f . . . . . 
. . . . . . . . . . f e f c 8 8 9 9 8 9 9 8 b 9 8 f . . . . . . 
. . . . . . . . . . . f f d f b 8 9 8 9 9 8 9 9 8 . . . . . . . 
. . . . . . . . . . . c d d 2 f f 8 8 9 1 8 9 9 8 8 . . . . . . 
. . . . . . . . . . . . c 2 2 2 2 f f 9 8 9 9 9 8 . . . . . . . 
. . . . . . . . . . . . f c 2 2 2 2 2 f f 9 9 8 . . . . . . . . 
. . . . . . . . . . . c c f c 2 2 2 2 2 2 f 8 . . . . . . . . . 
. . . . . . . . . . c d b c 2 c c 2 2 2 2 f . 8 . . . . . . . . 
. . . . . . . . . . c d d f 2 2 2 c c 2 2 f . . . . . . . . . . 
. . . . . . . . . . . c c f 2 2 2 2 2 2 2 f . . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 2 2 2 f . . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 2 2 2 f . . . . . . . . . . 
. . . . . . . . . . . . . f 1 1 1 1 1 1 1 f . . . . . . . . . . 
. . . . . . . . . . . . . f f f f f f f f . . . . . . . . . . . 
. . . . . . . . . . . . . . f f 8 6 6 f . . . . . . . . . . . . 
. . . . . . . . . . . . . . f f f f f f . . . . . . . . . . . . 
. . . . . . . . . . . . . . . f f f f . . . . . . . . . . . . . 
`)
    SlashLeftIdleAtk = animation.createAnimation(ActionKind.SlashLeftIdleAtk, 120)
    animation.attachAnimation(HeroPlayer, SlashLeftIdleAtk)
    SlashLeftIdleAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f 1 1 1 1 3 3 3 3 f f 2 2 f . . . . . . . 
. . . . . . . . . . f 1 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . . 
. . . . . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . 
. . . . . . . . f f f f f f f f f f f 3 3 3 3 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 f f 2 2 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 3 f f 2 f 2 f . . . . . 
. . . . . . . . f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f 2 2 f . . . . . 
. . . . . . . . . f 2 f f f f f f f f f f 2 2 3 f 2 f . . . . . 
. . . . . . . . . . f c 8 9 8 9 9 9 9 9 8 f f 2 f 2 f . . . . . 
. . . . . . . . . . . b 1 8 9 8 9 9 9 9 9 8 b f f 2 f . . . . . 
. . . . . . . . . . . b f f 8 8 9 8 9 9 9 8 b 9 8 f . . . . . . 
. . . . . . . . . . . b f f d b 8 9 8 9 9 8 9 9 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 8 9 1 8 9 9 8 . . . . . . . 
. . . . . . . . . . . f d d d d d b b 8 9 8 9 9 9 8 . . . . . . 
. . . . . . . . . . . . f d d d d d d b 8 9 9 8 8 . . . . . . . 
. . . . . . . . . . . . . f f f f f f f f 8 8 . . . . . . . . . 
. . . . . . . . . . . . . . f f f 1 1 2 2 f 8 . . . . . . . . . 
. . . . . . . . . . . . f f 2 2 1 2 2 2 2 2 f . . . . . . . . . 
. . . . . . . . . . c c c f 2 2 2 2 2 c 2 2 2 f . . . . . . . . 
. . . . . . . . . c d d c f 2 2 2 2 2 2 c 2 2 2 f . . . . . . . 
. . . . . . . . . c d b f f 2 2 2 2 2 2 2 c 2 2 2 f . . . . . . 
. . . . . . . . . . c c . f 2 2 2 2 2 2 2 f c d d c . . . . . . 
. . . . . . . . . . . . . f 1 1 1 1 1 1 1 f c d f f . . . . . . 
. . . . . . . . . . . . . f f f f f f f f . . c f e f . . . . . 
. . . . . . . . . . . . . f 8 6 6 f 8 8 f . . . . f 1 f . . . . 
. . . . . . . . . . . . . f 8 6 6 f 8 8 f . . . . . f 1 f . . . 
. . . . . . . . . . . . . f f f f f f f f . . . . . . f 1 f . . 
. . . . . . . . . . . . . . f f . . f f . . . . . . . . f f . . 
`)
    SlashLeftIdleAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f 1 1 1 1 3 3 3 3 f f 2 2 f . . . . . . . 
. . . . . . . . . . f 1 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . . 
. . . . . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . 
. . . . . . . . f f f f f f f f f f f 3 3 3 3 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 f f 2 2 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 3 f f 2 f 2 f . . . . . 
. . . . . . . . f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f 2 2 f . . . . . 
. . . . . . . . . f 2 f f f f f f f f f f 2 2 3 f 2 f . . . . . 
. . . . . . . . . . f c c 8 8 9 9 9 9 9 8 f f 2 f 2 f . . . . . 
. . . . . . . . . . . b 1 8 9 8 9 9 9 9 9 8 b f f 2 f . . . . . 
. . . . . . . . . . . b f f 8 8 9 9 9 9 9 8 b 9 8 f . . . . . . 
. . . . . . . . . . . b f f d b 8 9 8 9 9 9 8 9 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 9 8 1 9 9 8 9 8 . . . . . . 
. . . . . . . . . . . f d d d d d b 8 8 8 8 8 9 8 . . . . . . . 
. . . . . . . . . . . . f d d d d f f f 8 9 9 8 . . . . . . . . 
. . . . . . . . . . . . . f f f f 1 1 2 2 f f . . . . . . . . . 
. . . . . . . . . . . . f f 2 2 1 2 2 2 2 2 2 f c . . . . . . . 
. . . . . . . . . . . c c f 2 2 2 2 2 2 c 2 2 2 d c . . . . . . 
. . . . . . . . . . c d d c 2 2 2 2 2 2 2 c c 2 d f f . . . . . 
. . . . . . . . . . c d b f 2 2 2 2 2 2 2 f . c c f e f . . . . 
. . . . . . . . . . . c c f 1 1 1 1 1 1 1 f . . . c f 1 f . . . 
. . . . . . . . . . . . . f f f f f f f f . . . . . . f 1 f . . 
. . . . . . . . . . . . . f 8 6 6 f 8 8 f . . . . . . . f 1 f . 
. . . . . . . . . . . . . f f f f f f f f . . . . . . . . f f . 
. . . . . . . . . . . . . . f f . . f f . . . . . . . . . . . . 
`)
    SlashLeftIdleAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f 1 1 1 1 3 3 3 3 f f 2 2 f . . . . . . . 
. . . . . . . . . . f 1 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . . 
. . . . . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . 
. . . . . . . . f f f f f f f f f f f 3 3 3 3 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 f f 2 2 3 f 2 f . . . . . 
. . . . . . . f f 3 3 3 3 3 3 3 3 3 3 3 3 f f 2 f 2 f . . . . . 
. . . . . . . f 1 f 3 2 2 2 2 2 2 2 2 2 2 3 3 f 2 2 f . . . . . 
. . . . . . . f 1 f 2 f f f f f f f f f f 2 2 3 f 2 f . . . . . 
. . . . . . . . f 1 f c 8 9 8 9 9 9 9 9 8 f f 2 f 2 f . . . . . 
. . . . . . . . . f 1 f 1 8 9 8 9 9 9 9 9 8 b f f 2 f . . . . . 
. . . . . . . . . . f e f c 8 8 9 8 9 9 9 8 b 9 8 f . . . . . . 
. . . . . . . . . . . f f d f b 8 9 8 9 9 8 9 9 8 . . . . . . . 
. . . . . . . . . . . c d d 2 f f 8 8 9 1 8 9 9 9 8 . . . . . . 
. . . . . . . . . . . . c 2 2 2 2 f f 8 9 8 9 9 8 . . . . . . . 
. . . . . . . . . . . . f c 2 2 2 2 2 f f 9 9 8 . . . . . . . . 
. . . . . . . . . . . c c f c 2 2 2 2 2 2 f 8 . . . . . . . . . 
. . . . . . . . . . c d b c 2 c c 2 2 2 2 f . 8 . . . . . . . . 
. . . . . . . . . . c d d f 2 2 2 c c 2 2 f . . . . . . . . . . 
. . . . . . . . . . . c c f 2 2 2 2 2 2 2 f . . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 2 2 2 f . . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 2 2 2 f . . . . . . . . . . 
. . . . . . . . . . . . . f 1 1 1 1 1 1 1 f . . . . . . . . . . 
. . . . . . . . . . . . . f f f f f f f f . . . . . . . . . . . 
. . . . . . . . . . . . . f 8 6 6 f 8 8 f . . . . . . . . . . . 
. . . . . . . . . . . . . f f f f f f f f . . . . . . . . . . . 
. . . . . . . . . . . . . . f f . . f f . . . . . . . . . . . . 
`)
    SlashLeftIdleAtk.addAnimationFrame(img`
. . . 1 1 1 1 1 1 1 1 1 1 . . . . . . . . . . . . . . . . . . . 
. . 1 1 1 1 1 1 1 1 1 . . . . . . . . . . . . . . . . . . . . . 
. 1 1 1 1 1 1 1 1 1 . . f f f f f f f f f f f f . . . . . . . . 
. 1 1 1 1 1 1 1 1 . . f 1 1 1 1 3 3 3 3 f f 2 2 f . . . . . . . 
1 1 1 1 1 1 1 1 1 . f 1 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . . 
1 1 1 1 1 1 1 1 1 . f 3 3 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . 
1 1 1 1 1 1 1 1 f f f f f f f f f f f 3 3 3 3 3 f 2 f . . . . . 
1 1 1 1 1 1 1 f 1 f 3 3 3 3 3 3 3 3 3 f f 2 2 3 f 2 f . . . . . 
1 1 1 1 1 1 1 f 1 f 3 3 3 3 3 3 3 3 3 3 3 f f 2 f 2 f . . . . . 
1 1 1 1 1 1 1 1 f 1 f 2 2 2 2 2 2 2 2 2 2 3 3 f 2 2 f . . . . . 
1 1 1 1 1 1 1 1 f 1 f f f f f f f f f f f 2 2 3 f 2 f . . . . . 
1 1 1 1 1 1 1 1 1 f 1 f 8 9 8 9 9 9 9 9 8 f f 2 f 2 f . . . . . 
1 1 1 1 1 1 1 1 1 1 f b f c 9 8 9 9 9 9 9 8 b f f 2 f . . . . . 
1 1 1 1 1 1 1 1 1 1 . f f d f 8 9 9 9 9 9 8 b 9 8 f . . . . . . 
1 1 1 1 1 1 1 1 1 . . c d d 2 f 8 9 8 9 9 9 8 9 8 . . . . . . . 
1 1 1 1 1 1 1 1 1 . . b c 2 2 2 f 8 9 8 1 9 9 8 8 . . . . . . . 
1 1 1 1 1 1 1 1 1 . . f c 2 2 2 2 f 8 8 8 8 8 9 9 8 . . . . . . 
1 1 1 1 1 1 1 1 1 1 . . f c 2 2 2 2 f 8 8 9 9 8 8 . . . . . . . 
1 1 1 1 1 1 1 1 1 1 1 1 . c 2 2 2 2 2 f . 8 8 . . . . . . . . . 
1 1 1 1 1 1 1 1 1 1 1 1 1 f c 2 2 2 2 2 f . 8 . . . . . . . . . 
1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 c 2 2 2 2 2 f . . . . . . . . . . 
. 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 c 2 2 2 2 f . . . . . . . . . . 
. 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 c c 2 2 f . . . . . . . . . . 
. . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 2 f . . . . . . . . . . 
. . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 f . . . . . . . . . . 
. . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . . . . . 
. . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . . . 
. . . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . . 
. . . . . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . 
. . . . . . . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . 
. . . . . . . . . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
. . . . . . . . . . . . . . f f 1 1 1 1 1 1 1 1 1 1 1 1 . . . . 
`)
    SlashLeftIdleAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f 1 1 1 1 3 3 3 3 f f 2 2 f . . . . . . . 
. . . . . . . . . . f 1 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . . 
. . . . . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . 
. . . . . . 1 1 f f f f f f f f f f f 3 3 3 3 3 f 2 f . . . . . 
. . . . . 1 1 f 3 3 3 3 3 3 3 3 3 3 3 f f 2 2 3 f 2 f . . . . . 
. . . . 1 1 1 f f 3 3 3 3 3 3 3 3 3 3 3 3 f f 2 f 2 f . . . . . 
. . . . 1 1 1 f 1 f 3 2 2 2 2 2 2 2 2 2 2 3 3 f 2 2 f . . . . . 
. . . 1 1 1 1 f 1 f 2 f f f f f f f f f f 2 2 3 f 2 f . . . . . 
. . . 1 1 1 1 1 f 1 f c 8 9 8 9 9 9 9 9 8 f f 2 f 2 f . . . . . 
. . . 1 1 1 1 1 1 f 1 f 1 8 9 8 9 9 9 9 9 8 b f f 2 f . . . . . 
. . . 1 1 1 1 1 1 1 f e f c 8 8 9 8 9 9 9 8 b 9 8 f . . . . . . 
. . . 1 1 1 1 1 1 1 . f f d f b 8 9 8 9 9 8 9 9 8 . . . . . . . 
. . . 1 1 1 1 1 1 1 1 c d d 2 f f 8 8 9 1 8 9 9 9 8 . . . . . . 
. . . 1 1 1 1 1 1 1 1 . c 2 2 2 2 f f 8 9 8 9 9 8 . . . . . . . 
. . . . 1 1 1 1 1 1 1 . f c 2 2 2 2 2 f f 8 9 8 . . . . . . . . 
. . . . 1 1 1 1 1 1 1 c c f c 2 2 2 2 2 2 f 8 . . . . . . . . . 
. . . . . 1 1 1 1 1 1 1 b c 2 c c 2 2 2 2 f . 8 . . . . . . . . 
. . . . . . 1 1 1 1 1 1 d f 2 2 2 c c 2 2 f . . . . . . . . . . 
. . . . . . 1 1 1 1 1 1 c f 2 2 2 2 2 2 2 f . . . . . . . . . . 
. . . . . . . 1 1 1 1 1 1 f 2 2 2 2 2 2 2 f . . . . . . . . . . 
. . . . . . . . . 1 1 1 1 f 1 1 1 1 1 1 1 f . . . . . . . . . . 
. . . . . . . . . . . . 1 1 f f f f f f f . . . . . . . . . . . 
. . . . . . . . . . . . . f 8 6 6 f 8 8 f . . . . . . . . . . . 
. . . . . . . . . . . . . f 8 6 6 f 8 8 f . . . . . . . . . . . 
. . . . . . . . . . . . . f f f f f f f f . . . . . . . . . . . 
. . . . . . . . . . . . . . f f . . f f . . . . . . . . . . . . 
`)
    SlashLeftIdleAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f 1 1 1 1 3 3 3 3 f f 2 2 f . . . . . . . 
. . . . . . . . . . f 1 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . . 
. . . . . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . 
. . . . . . . . f f f f f f f f f f f 3 3 3 3 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 f f 2 2 3 f 2 f . . . . . 
. . . . . . . f f 3 3 3 3 3 3 3 3 3 3 3 3 f f 2 f 2 f . . . . . 
. . . . . . . f 1 f 3 2 2 2 2 2 2 2 2 2 2 3 3 f 2 2 f . . . . . 
. . . . . . . f 1 f 2 f f f f f f f f f f 2 2 3 f 2 f . . . . . 
. . . . . . . . f 1 f c 8 9 8 9 9 9 9 9 8 f f 2 f 2 f . . . . . 
. . . . . . . . . f 1 f 1 8 9 8 9 8 9 9 9 8 b f f 2 f . . . . . 
. . . . . . . . . . f e f c 8 8 9 9 8 9 9 8 b 9 8 f . . . . . . 
. . . . . . . . . . . f f d f b 8 9 8 9 9 8 9 9 8 . . . . . . . 
. . . . . . . . . . . c d d 2 f f 8 8 9 1 8 9 9 8 8 . . . . . . 
. . . . . . . . . . . . c 2 2 2 2 f f 9 8 9 9 9 8 . . . . . . . 
. . . . . . . . . . . . f c 2 2 2 2 2 f f 9 9 8 . . . . . . . . 
. . . . . . . . . . . c c f c 2 2 2 2 2 2 f 8 . . . . . . . . . 
. . . . . . . . . . c d b c 2 c c 2 2 2 2 f . 8 . . . . . . . . 
. . . . . . . . . . c d d f 2 2 2 c c 2 2 f . . . . . . . . . . 
. . . . . . . . . . . c c f 2 2 2 2 2 2 2 f . . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 2 2 2 f . . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 2 2 2 f . . . . . . . . . . 
. . . . . . . . . . . . . f 1 1 1 1 1 1 1 f . . . . . . . . . . 
. . . . . . . . . . . . . f f f f f f f f . . . . . . . . . . . 
. . . . . . . . . . . . . f 8 6 6 f 8 8 f . . . . . . . . . . . 
. . . . . . . . . . . . . f f f f f f f f . . . . . . . . . . . 
. . . . . . . . . . . . . . f f . . f f . . . . . . . . . . . . 
`)
    SlashLeftJump = animation.createAnimation(ActionKind.SlashLeftJump, 120)
    animation.attachAnimation(HeroPlayer, SlashLeftJump)
    SlashLeftJump.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f 1 1 1 1 3 3 3 3 f f 2 2 f . . . . . . . 
. . . . . . . . . . f 1 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . . 
. . . . . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . 
. . . . . . . . f f f f f f f f f f f 3 3 3 3 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 f f 2 2 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 3 f f 2 f 2 f . . . . . 
. . . . . . . . f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f 2 2 f . . . . . 
. . . . . . . . . f 2 f f f f f f f f f f 2 2 3 f 2 f . . . . . 
. . . . . . . . . . f c 8 9 8 9 9 9 9 9 8 f f 2 f 2 f . . . . . 
. . . . . . . . . . . b 1 8 9 8 9 9 9 9 9 8 b f f 2 f . . . . . 
. . . . . . . . . . . b f f 8 8 9 8 9 9 9 8 b 9 8 f . . . . . . 
. . . . . . . . . . . b f f d b 8 9 8 9 9 8 9 9 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 8 9 1 8 9 9 8 . . . . . . . 
. . . . . . . . . . . f d d d d d b b 8 9 8 9 9 9 8 . . . . . . 
. . . . . . . . . . . . f d d d d f f f 8 9 9 8 8 . . . . . . . 
. . . . . . . . . . . . . f f f f 1 1 2 2 f 8 . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 1 2 2 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 2 c 2 2 f . . . . . . . . . 
. . . . . . . . . . . f f f 2 2 2 2 c c 2 2 f . . . . . . . . . 
. . . . . . . . . . f d c f 2 2 2 c d d 2 2 f . . . . . . . . . 
. . . . . . . . . . f b c f 2 2 2 c b d 2 2 f . . . . . . . . . 
. . . . . . . . . . . f f f 1 1 1 1 c c c c . . . . . . . . . . 
. . . . . . . . . . . . . f f f f f f f f . . . . . . . . . . . 
. . . . . . . . . . . . . f 8 8 f 8 6 6 f . . . . . . . . . . . 
. . . . . . . . . . . . . f f f f f f f f . . . . . . . . . . . 
. . . . . . . . . . . . . . f f . . f f . . . . . . . . . . . . 
`)
    SlashLeftJump.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f 1 1 1 1 3 3 3 3 f f 2 2 f . . . . . . . 
. . . . . . . . . . f 1 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . . 
. . . . . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . 
. . . . . . . . f f f f f f f f f f f 3 3 3 3 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 f f 2 2 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 3 f f 2 f 2 f . . . . . 
. . . . . . . . f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f 2 2 f . . . . . 
. . . . . . . . . f 2 f f f f f f f f f f 2 2 3 f 2 f . . . . . 
. . . . . . . . . . f c 8 9 8 9 9 9 9 9 8 f f 2 f 2 f . . . . . 
. . . . . . . . . . . b 1 8 9 8 9 9 9 9 9 8 b f f 2 f . . . . . 
. . . . . . . . . . . b f f 8 8 9 8 9 9 9 8 b 9 8 f . . . . . . 
. . . . . . . . . . . b f f d b 8 9 8 9 9 8 9 9 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 8 9 1 8 9 9 8 . . . . . . . 
. . . . . . . . . . . f d d d d d b b 8 9 8 9 9 9 8 . . . . . . 
. . . . . . . . . . . . f d d d d d d b 8 9 9 8 8 . . . . . . . 
. . . . . . . . . . . . . f f f f f f f f 8 8 . . . . . . . . . 
. . . . . . . . . . . . . . f f f 1 1 2 2 f 8 . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 1 2 2 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 2 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 c 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . . f f 2 2 2 2 c 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . f c f 2 2 2 2 c 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . f c f 1 1 1 1 1 c d d c . . . . . . . . . 
. . . . . . . . . . . f b f f f f f f c b d c . . . . . . . . . 
. . . . . . . . . . . . f f 8 8 f 8 6 6 c c . . . . . . . . . . 
. . . . . . . . . . . . . f f f f f f f f . . . . . . . . . . . 
. . . . . . . . . . . . . . f f . . f f . . . . . . . . . . . . 
`)
    SlashLeftJump.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f 1 1 1 1 3 3 3 3 f f 2 2 f . . . . . . . 
. . . . . . . . . . f 1 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . . 
. . . . . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . 
. . . . . . . . f f f f f f f f f f f 3 3 3 3 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 f f 2 2 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 3 f f 2 f 2 f . . . . . 
. . . . . . . . f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f 2 2 f . . . . . 
. . . . . . . . . f 2 f f f f f f f f f f 2 2 3 f 2 f . . . . . 
. . . . . . . . . . f c 8 9 8 9 9 9 9 9 8 f f 2 f 2 f . . . . . 
. . . . . . . . . . . b 1 8 9 8 9 9 9 9 9 8 b f f 2 f . . . . . 
. . . . . . . . . . . b f f 8 8 9 8 9 9 9 8 b 9 8 f . . . . . . 
. . . . . . . . . . . b f f d b 8 9 8 9 9 8 9 9 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 8 9 1 8 9 9 8 . . . . . . . 
. . . . . . . . . . . f d d d d d b b 8 9 8 9 9 9 8 . . . . . . 
. . . . . . . . . . . . f d d d d d d b 8 9 9 8 8 . . . . . . . 
. . . . . . . . . . . . . f f f f f f f f 8 8 . . . . . . . . . 
. . . . . . . . . . . . . . f f f 1 1 2 2 f 8 . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 1 2 2 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 2 2 2 2 2 f . . . . . . . . 
. . . . . . . . . . . . f f 2 2 2 2 2 c 2 2 2 2 f . . . . . . . 
. . . . . . . . . . . f c f 2 2 2 2 2 2 c 2 2 2 2 f . . . . . . 
. . . . . . . . . . f 2 c f 2 2 2 2 2 2 2 c 2 d d c . . . . . . 
. . . . . . . . . . f b c f 1 1 1 1 1 1 1 f c d b c . . . . . . 
. . . . . . . . . . f d b f 1 1 1 1 1 1 1 f . c c . . . . . . . 
. . . . . . . . . . . f f f f f f f f f f f . . . . . . . . . . 
. . . . . . . . . . . . . . f 8 8 f 8 6 6 f . . . . . . . . . . 
. . . . . . . . . . . . . . f f f f f f f f . . . . . . . . . . 
. . . . . . . . . . . . . . . f f . f f . . . . . . . . . . . . 
`)
    SlashLeftJump.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f 1 1 1 1 3 3 3 3 f f 2 2 f . . . . . . . 
. . . . . . . . . . f 1 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . . 
. . . . . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . 
. . . . . . . . f f f f f f f f f f f 3 3 3 3 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 f f 2 2 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 3 f f 2 f 2 f . . . . . 
. . . . . . . . f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f 2 2 f . . . . . 
. . . . . . . . . f 2 f f f f f f f f f f 2 2 3 f 2 f . . . . . 
. . . . . . . . . . f c 8 9 8 9 9 9 9 9 8 f f 2 f 2 f . . . . . 
. . . . . . . . . . . b 1 8 9 8 9 8 9 9 9 8 b f f 2 f . . . . . 
. . . . . . . . . . . b f f 8 8 9 9 8 9 9 8 b 9 8 f . . . . . . 
. . . . . . . . . . . b f f d b 8 9 8 9 9 8 9 9 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 8 9 1 8 9 9 9 8 . . . . . . 
. . . . . . . . . . . f d d d d d b 8 9 8 9 9 9 8 . . . . . . . 
. . . . . . . . . . . . f d d d d d b 8 f 9 9 8 . . . . . . . . 
. . . . . . . . . . . . . f f f f f f f . 8 8 . . . . . . . . . 
. . . . . . . . . . . . . . . f b f f . . . . 8 . . . . . . . . 
. . . . . . . . . . . . . . f f f 1 1 f f f . . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 1 2 2 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 2 2 2 2 2 f . . . . . . . . 
. . . . . . . . . . . . f f 2 2 2 2 2 c 2 2 2 2 f . . . . . . . 
. . . . . . . . . . . f c f 2 2 2 2 2 2 c 2 2 2 2 f . . . . . . 
. . . . . . . . . . f 2 c f 2 2 2 2 2 2 2 c 2 d d f . . . . . . 
. . . . . . . . . . f d c f 1 1 1 1 1 1 1 . c d b c . . . . . . 
. . . . . . . . . . f b c f 1 1 1 1 1 1 1 f . c c . . . . . . . 
. . . . . . . . . . . f f f f f f f f f f . . . . . . . . . . . 
. . . . . . . . . . . . . f 8 8 f 8 6 6 f . . . . . . . . . . . 
. . . . . . . . . . . . . f f f f 8 6 6 f . . . . . . . . . . . 
. . . . . . . . . . . . . . f f f f f f f . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . f f . . . . . . . . . . . . 
`)
    SlashLeftJump.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f 1 1 1 1 3 3 3 3 f f 2 2 f . . . . . . . 
. . . . . . . . . . f 1 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . . 
. . . . . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . 
. . . . . . . . f f f f f f f f f f f 3 3 3 3 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 f f 2 2 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 3 f f 2 f 2 f . . . . . 
. . . . . . . . f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f 2 2 f . . . . . 
. . . . . . . . . f 2 f f f f f f f f f f 2 2 3 f 2 f . . . . . 
. . . . . . . . . . f c c 8 8 9 9 9 9 9 8 f f 2 f 2 f . . . . . 
. . . . . . . . . . . b 1 8 9 8 9 9 9 9 9 8 b f f 2 f . . . . . 
. . . . . . . . . . . b f f 8 8 9 9 9 9 9 8 b 9 8 f . . . . . . 
. . . . . . . . . . . b f f d b 8 9 8 9 9 9 8 9 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 9 8 1 9 9 8 8 8 . . . . . . 
. . . . . . . . . . . f d d d d d b 8 8 8 8 8 9 8 . . . . . . . 
. . . . . . . . . . . . f d d d d d d b 8 9 9 8 . . . . . . . . 
. . . . . . . . . . . . . f f f f f f f f 8 8 . . . . . . . . . 
. . . . . . . . . . . . . . f f f 1 1 2 2 f f 8 . . . . . . . . 
. . . . . . . . . . . . . f 2 2 1 2 2 2 2 2 2 f . . . . . . . . 
. . . . . . . . . . . . f f 2 2 2 2 2 2 2 2 2 2 f . . . . . . . 
. . . . . . . . . . f f c f 2 2 2 2 2 2 2 2 2 2 2 f f . . . . . 
. . . . . . . . c c 2 2 c f 2 2 2 2 2 2 c 2 2 2 2 d d f . . . . 
. . . . . . . c d d 2 c c f 2 2 2 2 2 2 2 c c c 2 d b f . . . . 
. . . . . . . c b d 2 f f f 1 1 1 1 1 1 1 f . . c c c . . . . . 
. . . . . . . . c c f . . f 1 1 1 1 1 1 1 f . . . . . . . . . . 
. . . . . . . . . . . . . f f f f f f f f . . . . . . . . . . . 
. . . . . . . . . . . . . . f 8 6 6 f f . . . . . . . . . . . . 
. . . . . . . . . . . . . . f f f f f f . . . . . . . . . . . . 
. . . . . . . . . . . . . . f f f f f f . . . . . . . . . . . . 
`)
    SlashLeftJump.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f 1 1 1 1 3 3 3 3 f f 2 2 f . . . . . . . 
. . . . . . . . . . f 1 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . . 
. . . . . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . 
. . . . . . . . f f f f f f f f f f f 3 3 3 3 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 f f 2 2 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 3 f f 2 f 2 f . . . . . 
. . . . . . . . f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f 2 2 f . . . . . 
. . . . . . . . . f 2 f f f f f f f f f f 2 2 3 f 2 f . . . . . 
. . . . . . . . . . f c c 8 8 9 9 9 9 9 8 f f 2 f 2 f . . . . . 
. . . . . . . . . . . b 1 8 9 8 9 9 9 9 9 8 b f f 2 f . . . . . 
. . . . . . . . . . . b f f 8 8 9 9 9 9 9 8 b 9 8 f . . . . . . 
. . . . . . . . . . . b f f d b 8 9 8 9 9 9 8 9 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 9 8 1 9 9 8 8 . . . . . . . 
. . . . . . . . . . . f d d d d d b 8 8 8 8 8 9 9 8 . . . . . . 
. . . . . . . . . . . . f d d d d f f f 8 9 9 8 8 . . . . . . . 
. . . . . . . . . . . . . f f f f 1 1 2 2 f f . . . . . . . . . 
. . . . . . . . . . . . f f 2 2 1 2 2 2 2 2 2 f f c c . . . . . 
. . . . . . . . c c f f c f 2 2 2 2 2 2 2 2 2 2 2 d d c . . . . 
. . . . . . . c d d 2 2 c f 2 2 2 2 2 2 c 2 2 2 2 d b c . . . . 
. . . . . . . c b d 2 c c f 2 2 2 2 2 2 2 c c c c c c . . . . . 
. . . . . . . . c c f f f f 2 2 2 2 2 2 2 f . . . . . . . . . . 
. . . . . . . . . . . . . f 1 1 1 1 1 1 1 f . . . . . . . . . . 
. . . . . . . . . . . . . f f f f f f f f . . . . . . . . . . . 
. . . . . . . . . . . . . f 8 6 6 f 8 8 f . . . . . . . . . . . 
. . . . . . . . . . . . . f f f f f f f f . . . . . . . . . . . 
. . . . . . . . . . . . . . f f . . f f . . . . . . . . . . . . 
`)
    SlashLeftJump.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f 1 1 1 1 3 3 3 3 f f 2 2 f . . . . . . . 
. . . . . . . . . . f 1 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . . 
. . . . . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . 
. . . . . . . . f f f f f f f f f f f 3 3 3 3 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 f f 2 2 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 3 f f 2 f 2 f . . . . . 
. . . . . . . . f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f 2 2 f . . . . . 
. . . . . . . . . f 2 f f f f f f f f f f 2 2 3 f 2 f . . . . . 
. . . . . . . . . . f c 8 9 8 9 9 9 9 9 8 f f 2 f 2 f . . . . . 
. . . . . . . . . . . b 1 8 9 8 9 9 9 9 9 8 b f f 2 f . . . . . 
. . . . . . . . . . . b f f 8 8 9 8 9 9 9 8 b 9 8 f . . . . . . 
. . . . . . . . . . . b f f d b 8 9 8 9 9 8 9 9 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 8 9 1 8 9 9 8 . . . . . . . 
. . . . . . . . . . . f d d d d d b b 8 9 8 9 9 9 8 . . . . . . 
. . . . . . . . . . . . f d d d d d d b 8 9 9 8 8 . . . . . . . 
. . . . . . . . . . . . . f f f f f f f f 8 8 . . . . . . . . . 
. . . . . . . . . . . . . . f f f 1 1 2 2 f 8 . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 1 2 2 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 2 2 2 2 2 f . . . . . . . . 
. . . . . . . . . . . . f f 2 2 2 2 2 c 2 2 2 2 f . . . . . . . 
. . . . . . . . . . . f c f 2 2 2 2 2 2 c 2 2 2 2 f . . . . . . 
. . . . . . . . . . f 2 c f 2 2 2 2 2 2 2 c 2 d d c . . . . . . 
. . . . . . . . . . f b c f 1 1 1 1 1 1 1 f c d b c . . . . . . 
. . . . . . . . . . f d b f 1 1 1 1 1 1 1 f . c c . . . . . . . 
. . . . . . . . . . . f f f f f f f f f f . . . . . . . . . . . 
. . . . . . . . . . . . . . f 8 6 6 f f . . . . . . . . . . . . 
. . . . . . . . . . . . . . f f f f f f . . . . . . . . . . . . 
. . . . . . . . . . . . . . f f f f f f . . . . . . . . . . . . 
`)
    SlashLeftJump.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f 1 1 1 1 3 3 3 3 f f 2 2 f . . . . . . . 
. . . . . . . . . . f 1 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . . 
. . . . . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . 
. . . . . . . . f f f f f f f f f f f 3 3 3 3 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 f f 2 2 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 3 f f 2 f 2 f . . . . . 
. . . . . . . . f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f 2 2 f . . . . . 
. . . . . . . . . f 2 f f f f f f f f f f 2 2 3 f 2 f . . . . . 
. . . . . . . . . . f c 8 9 8 9 9 9 9 9 8 f f 2 f 2 f . . . . . 
. . . . . . . . . . . b 1 8 9 8 9 8 9 9 9 8 b f f 2 f . . . . . 
. . . . . . . . . . . b f f 8 8 9 9 8 9 9 8 b 9 8 f . . . . . . 
. . . . . . . . . . . b f f d b 8 9 8 9 9 8 9 9 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 8 9 1 8 9 9 8 . . . . . . . 
. . . . . . . . . . . f d d d d d b 8 9 8 9 9 9 9 8 . . . . . . 
. . . . . . . . . . . . f d d d d d b 8 f 9 9 8 8 . . . . . . . 
. . . . . . . . . . . . . f f f f f f f . 8 8 . . . . . . . . . 
. . . . . . . . . . . . . . . f b f f . . . 8 . . . . . . . . . 
. . . . . . . . . . . . . . f f f 1 1 f f . . . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 1 2 2 2 2 f . . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 2 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 c 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . . f f 2 2 2 2 c 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . f c f 2 2 2 2 c 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . f c f 1 1 1 1 1 c d d c . . . . . . . . . 
. . . . . . . . . . . f b f 1 1 1 1 1 c b d c . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f c c . . . . . . . . . . 
. . . . . . . . . . . . . f 8 8 f 8 6 6 f . . . . . . . . . . . 
. . . . . . . . . . . . . f 8 8 f 8 6 6 f . . . . . . . . . . . 
. . . . . . . . . . . . . f f f f f f f f . . . . . . . . . . . 
. . . . . . . . . . . . . . f f . . f f . . . . . . . . . . . . 
`)
    SlashLeftJump.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f 1 1 1 1 3 3 3 3 f f 2 2 f . . . . . . . 
. . . . . . . . . . f 1 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . . 
. . . . . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . 
. . . . . . . . f f f f f f f f f f f 3 3 3 3 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 f f 2 2 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 3 f f 2 f 2 f . . . . . 
. . . . . . . . f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f 2 2 f . . . . . 
. . . . . . . . . f 2 f f f f f f f f f f 2 2 3 f 2 f . . . . . 
. . . . . . . . . . f c 8 9 8 9 9 9 9 9 8 f f 2 f 2 f . . . . . 
. . . . . . . . . . . b 1 8 9 8 9 9 9 9 9 8 b f f 2 f . . . . . 
. . . . . . . . . . . b f f 8 8 9 8 9 9 9 8 b 9 8 f . . . . . . 
. . . . . . . . . . . b f f d b 8 9 8 9 9 8 9 9 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 8 9 1 8 9 9 8 . . . . . . . 
. . . . . . . . . . . f d d d d d b b 8 9 8 9 9 9 8 . . . . . . 
. . . . . . . . . . . . f d d d d d d b 8 9 9 8 8 . . . . . . . 
. . . . . . . . . . . . . f f f f f f f f 8 8 . . . . . . . . . 
. . . . . . . . . . . . . . f f f 1 1 2 2 f 8 . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 1 2 2 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 2 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 c 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . . f f 2 2 2 2 c 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . f c f 2 2 2 2 c 2 2 2 f . . . . . . . . . 
. . . . . . . . . . . f c f 1 1 1 1 1 c d d c . . . . . . . . . 
. . . . . . . . . . . f b f 1 1 1 1 1 c b d c . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f c c . . . . . . . . . . 
. . . . . . . . . . . . . f 8 8 f 8 6 6 f . . . . . . . . . . . 
. . . . . . . . . . . . . f f f f f f f f . . . . . . . . . . . 
. . . . . . . . . . . . . . f f . . f f . . . . . . . . . . . . 
`)
    SlashLeftJumpAtk = animation.createAnimation(ActionKind.SlashLeftJumpAtk, 120)
    animation.attachAnimation(HeroPlayer, SlashLeftJumpAtk)
    SlashLeftJumpAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f 1 1 1 1 3 3 3 3 f f 2 2 f . . . . . . . 
. . . . . . . . . . f 1 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . . 
. . . . . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . 
. . . . . . . . f f f f f f f f f f f 3 3 3 3 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 f f 2 2 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 3 f f 2 f 2 f . . . . . 
. . . . . . . . f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f 2 2 f . . . . . 
. . . . . . . . . f 2 f f f f f f f f f f 2 2 3 f 2 f . . . . . 
. . . . . . . . . . f c 8 9 8 9 9 9 9 9 8 f f 2 f 2 f . . . . . 
. . . . . . . . . . . b 1 8 9 8 9 9 9 9 9 8 b f f 2 f . . . . . 
. . . . . . . . . . . b f f 8 8 9 8 9 9 9 8 b 9 8 f . . . . . . 
. . . . . . . . . . . b f f d b 8 9 8 9 9 8 9 9 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 8 9 1 8 9 9 8 . . . . . . . 
. . . . . . . . . . . f d d d d d b b 8 9 8 9 9 9 8 . . . . . . 
. . . . . . . . . . . . f d d d d d d b 8 9 9 8 8 . . . . . . . 
. . . . . . . . . . . . . f f f f f f f f 8 8 . . . . . . . . . 
. . . . . . . . . . . . . . f f f 1 1 2 2 f 8 . . . . . . . . . 
. . . . . . . . . . . . f f 2 2 1 2 2 2 2 2 f . . . . . . . . . 
. . . . . . . . . . c c c f 2 2 2 2 2 c 2 2 2 f . . . . . . . . 
. . . . . . . . . c d d c f 2 2 2 2 2 2 c 2 2 2 f . . . . . . . 
. . . . . . . . . c d b f f 2 2 2 2 2 2 2 c 2 2 2 f . . . . . . 
. . . . . . . . . . c c . f 2 2 2 2 2 2 2 f c d d c . . . . . . 
. . . . . . . . . . . . . f 1 1 1 1 1 1 1 f c d f f . . . . . . 
. . . . . . . . . . . . . f f f f f f f f . . c f e f . . . . . 
. . . . . . . . . . . . . f 8 6 6 f 8 8 f . . . . f 1 f . . . . 
. . . . . . . . . . . . . f f f f f 8 8 f . . . . . f 1 f . . . 
. . . . . . . . . . . . . . f f . f f f f . . . . . . f 1 f . . 
. . . . . . . . . . . . . . . . . . f f . . . . . . . . f f . . 
`)
    SlashLeftJumpAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f 1 1 1 1 3 3 3 3 f f 2 2 f . . . . . . . 
. . . . . . . . . . f 1 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . . 
. . . . . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . 
. . . . . . . . f f f f f f f f f f f 3 3 3 3 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 f f 2 2 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 3 f f 2 f 2 f . . . . . 
. . . . . . . . f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f 2 2 f . . . . . 
. . . . . . . . . f 2 f f f f f f f f f f 2 2 3 f 2 f . . . . . 
. . . . . . . . . . f c c 8 8 9 9 9 9 9 8 f f 2 f 2 f . . . . . 
. . . . . . . . . . . b 1 8 9 8 9 9 9 9 9 8 b f f 2 f . . . . . 
. . . . . . . . . . . b f f 8 8 9 9 9 9 9 8 b 9 8 f . . . . . . 
. . . . . . . . . . . b f f d b 8 9 8 9 9 9 8 9 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 9 8 1 9 9 8 9 8 . . . . . . 
. . . . . . . . . . . f d d d d d b 8 8 8 8 8 9 8 . . . . . . . 
. . . . . . . . . . . . f d d d d f f f 8 9 9 8 . . . . . . . . 
. . . . . . . . . . . . . f f f f 1 1 2 2 f f . . . . . . . . . 
. . . . . . . . . . . . f f 2 2 1 2 2 2 2 2 2 f c . . . . . . . 
. . . . . . . . . . . c c f 2 2 2 2 2 2 c 2 2 2 d c . . . . . . 
. . . . . . . . . . c d d c 2 2 2 2 2 2 2 c c 2 d f f . . . . . 
. . . . . . . . . . c d b f 2 2 2 2 2 2 2 f . c c f e f . . . . 
. . . . . . . . . . . c c f f f f 1 1 1 1 f . . . c f 1 f . . . 
. . . . . . . . . . . . . f 8 6 6 f f f f . . . . . . f 1 f . . 
. . . . . . . . . . . . . f f f f f 8 8 f . . . . . . . f 1 f . 
. . . . . . . . . . . . . . f f . f f f f . . . . . . . . f f . 
. . . . . . . . . . . . . . . . . . f f . . . . . . . . . . . . 
`)
    SlashLeftJumpAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f 1 1 1 1 3 3 3 3 f f 2 2 f . . . . . . . 
. . . . . . . . . . f 1 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . . 
. . . . . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . 
. . . . . . . . f f f f f f f f f f f 3 3 3 3 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 f f 2 2 3 f 2 f . . . . . 
. . . . . . . f f 3 3 3 3 3 3 3 3 3 3 3 3 f f 2 f 2 f . . . . . 
. . . . . . . f 1 f 3 2 2 2 2 2 2 2 2 2 2 3 3 f 2 2 f . . . . . 
. . . . . . . f 1 f 2 f f f f f f f f f f 2 2 3 f 2 f . . . . . 
. . . . . . . . f 1 f c 8 9 8 9 9 9 9 9 8 f f 2 f 2 f . . . . . 
. . . . . . . . . f 1 f 1 8 9 8 9 9 9 9 9 8 b f f 2 f . . . . . 
. . . . . . . . . . f e f c 8 8 9 8 9 9 9 8 b 9 8 f . . . . . . 
. . . . . . . . . . . f f d f b 8 9 8 9 9 8 9 9 8 . . . . . . . 
. . . . . . . . . . . c d d 2 f f 8 8 9 1 8 9 9 9 8 . . . . . . 
. . . . . . . . . . . . c 2 2 2 2 f f 8 9 8 9 9 8 . . . . . . . 
. . . . . . . . . . . . f c 2 2 2 2 2 f f 9 9 8 . . . . . . . . 
. . . . . . . . . . . c c f c 2 2 2 2 2 2 f 8 . . . . . . . . . 
. . . . . . . . . . c d b c 2 c c 2 2 2 2 f . 8 . . . . . . . . 
. . . . . . . . . . c d d f 2 2 2 c c 2 2 f . . . . . . . . . . 
. . . . . . . . . . . c c f 2 2 2 2 2 2 2 f . . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 2 2 2 f . . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 2 2 2 f . . . . . . . . . . 
. . . . . . . . . . . . . f f f f 1 1 1 1 f . . . . . . . . . . 
. . . . . . . . . . . . . f 8 6 6 f f f f . . . . . . . . . . . 
. . . . . . . . . . . . . f f f f f 8 8 f . . . . . . . . . . . 
. . . . . . . . . . . . . . f f . f f f f . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . f f . . . . . . . . . . . . 
`)
    SlashLeftJumpAtk.addAnimationFrame(img`
. . . 1 1 1 1 1 1 1 1 1 1 . . . . . . . . . . . . . . . . . . . 
. . 1 1 1 1 1 1 1 1 1 . . . . . . . . . . . . . . . . . . . . . 
. 1 1 1 1 1 1 1 1 1 . . f f f f f f f f f f f f . . . . . . . . 
. 1 1 1 1 1 1 1 1 . . f 1 1 1 1 3 3 3 3 f f 2 2 f . . . . . . . 
1 1 1 1 1 1 1 1 1 . f 1 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . . 
1 1 1 1 1 1 1 1 1 . f 3 3 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . 
1 1 1 1 1 1 1 1 f f f f f f f f f f f 3 3 3 3 3 f 2 f . . . . . 
1 1 1 1 1 1 1 f 1 f 3 3 3 3 3 3 3 3 3 f f 2 2 3 f 2 f . . . . . 
1 1 1 1 1 1 1 f 1 f 3 3 3 3 3 3 3 3 3 3 3 f f 2 f 2 f . . . . . 
1 1 1 1 1 1 1 1 f 1 f 2 2 2 2 2 2 2 2 2 2 3 3 f 2 2 f . . . . . 
1 1 1 1 1 1 1 1 f 1 f f f f f f f f f f f 2 2 3 f 2 f . . . . . 
1 1 1 1 1 1 1 1 1 f 1 f 8 9 8 9 9 9 9 9 8 f f 2 f 2 f . . . . . 
1 1 1 1 1 1 1 1 1 1 f b f c 9 8 9 9 9 9 9 8 b f f 2 f . . . . . 
1 1 1 1 1 1 1 1 1 1 . f f d f 8 9 9 9 9 9 8 b 9 8 f . . . . . . 
1 1 1 1 1 1 1 1 1 . . c d d 2 f 8 9 8 9 9 9 8 9 8 . . . . . . . 
1 1 1 1 1 1 1 1 1 . . b c 2 2 2 f 8 9 8 1 9 9 8 8 . . . . . . . 
1 1 1 1 1 1 1 1 1 . . f c 2 2 2 2 f 8 8 8 8 8 9 9 8 . . . . . . 
1 1 1 1 1 1 1 1 1 1 . . f c 2 2 2 2 f 8 8 9 9 8 8 . . . . . . . 
1 1 1 1 1 1 1 1 1 1 1 1 . c 2 2 2 2 2 f . 8 8 . . . . . . . . . 
1 1 1 1 1 1 1 1 1 1 1 1 1 f c 2 2 2 2 2 f . 8 . . . . . . . . . 
1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 c 2 2 2 2 2 f . . . . . . . . . . 
. 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 c 2 2 2 2 f . . . . . . . . . . 
. 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 c c 2 2 f . . . . . . . . . . 
. . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 2 f . . . . . . . . . . 
. . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 f . . . . . . . . . . 
. . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . . . . . 
. . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . . . 
. . . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . . 
. . . . . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . 
. . . . . . . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . 
. . . . . . . . . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
. . . . . . . . . . . . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 . . . . 
`)
    SlashLeftJumpAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f 1 1 1 1 3 3 3 3 f f 2 2 f . . . . . . . 
. . . . . . . . . . f 1 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . . 
. . . . . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . 
. . . . . . 1 1 f f f f f f f f f f f 3 3 3 3 3 f 2 f . . . . . 
. . . . . 1 1 f 3 3 3 3 3 3 3 3 3 3 3 f f 2 2 3 f 2 f . . . . . 
. . . . 1 1 1 f f 3 3 3 3 3 3 3 3 3 3 3 3 f f 2 f 2 f . . . . . 
. . . . 1 1 1 f 1 f 3 2 2 2 2 2 2 2 2 2 2 3 3 f 2 2 f . . . . . 
. . . 1 1 1 1 f 1 f 2 f f f f f f f f f f 2 2 3 f 2 f . . . . . 
. . . 1 1 1 1 1 f 1 f c 8 9 8 9 9 9 9 9 8 f f 2 f 2 f . . . . . 
. . . 1 1 1 1 1 1 f 1 f 1 8 9 8 9 9 9 9 9 8 b f f 2 f . . . . . 
. . . 1 1 1 1 1 1 1 f e f c 8 8 9 8 9 9 9 8 b 9 8 f . . . . . . 
. . . 1 1 1 1 1 1 1 . f f d f b 8 9 8 9 9 8 9 9 8 . . . . . . . 
. . . 1 1 1 1 1 1 1 1 c d d 2 f f 8 8 9 1 8 9 9 9 8 . . . . . . 
. . . 1 1 1 1 1 1 1 1 . c 2 2 2 2 f f 8 9 8 9 9 8 . . . . . . . 
. . . . 1 1 1 1 1 1 1 . f c 2 2 2 2 2 f f 8 9 8 . . . . . . . . 
. . . . 1 1 1 1 1 1 1 c c f c 2 2 2 2 2 2 f 8 . . . . . . . . . 
. . . . . 1 1 1 1 1 1 1 b c 2 c c 2 2 2 2 f . 8 . . . . . . . . 
. . . . . . 1 1 1 1 1 1 d f 2 2 2 c c 2 2 f . . . . . . . . . . 
. . . . . . 1 1 1 1 1 1 c f 2 2 2 2 2 2 2 f . . . . . . . . . . 
. . . . . . . 1 1 1 1 1 1 f 2 2 2 2 2 2 2 f . . . . . . . . . . 
. . . . . . . . . 1 1 1 1 f 1 1 1 1 1 1 1 f . . . . . . . . . . 
. . . . . . . . . . . . 1 1 f f f f f f f . . . . . . . . . . . 
. . . . . . . . . . . . . f 8 6 6 f 8 8 f . . . . . . . . . . . 
. . . . . . . . . . . . . f f f f f 8 8 f . . . . . . . . . . . 
. . . . . . . . . . . . . . f f . f f f f . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . f f . . . . . . . . . . . . 
`)
    SlashLeftJumpAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . . . . . . . . . . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . . . . . . . . . . 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . . . . 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 3 f f . . . . . . . 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 3 f 1 f . . . . . . . 
. . . . . f 2 f 3 2 2 f f f f f f f f f f 2 f 1 f . . . . . . . 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 9 8 c f 1 f . . . . . . . . 
. . . . . f 2 f f b 8 9 9 9 8 9 8 9 8 1 f 1 f . . . . . . . . . 
. . . . . . f 8 9 b 8 9 9 8 9 9 8 8 c f e f . . . . . . . . . . 
. . . . . . . 8 9 9 8 9 9 8 9 8 b f d f f . . . . . . . . . . . 
. . . . . . 8 8 9 9 8 1 9 8 8 f f 2 d d c . . . . . . . . . . . 
. . . . . . . 8 9 9 9 8 9 f f 2 2 2 2 c . . . . . . . . . . . . 
. . . . . . . . 8 9 9 f f 2 2 2 2 2 c f . . . . . . . . . . . . 
. . . . . . . . . 8 f 2 2 2 2 2 2 c f c c . . . . . . . . . . . 
. . . . . . . . 8 . f 2 2 2 2 c c 2 c b d c . . . . . . . . . . 
. . . . . . . . . . f 2 2 c c 2 2 2 f d d c . . . . . . . . . . 
. . . . . . . . . . f 2 2 2 2 2 2 2 f c c . . . . . . . . . . . 
. . . . . . . . . . f 2 2 2 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . . f 2 2 2 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . . f 1 1 1 1 f f f f . . . . . . . . . . . . . 
. . . . . . . . . . . f f f f 6 6 8 f . . . . . . . . . . . . . 
. . . . . . . . . . . f 8 8 f f f f f . . . . . . . . . . . . . 
. . . . . . . . . . . f f f f . f f . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f . . . . . . . . . . . . . . . . . . 
`)
    SlashLeftClimb = animation.createAnimation(ActionKind.SlashLeftClimb, 250)
    animation.attachAnimation(HeroPlayer, SlashLeftClimb)
    SlashLeftClimb.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f 1 1 1 1 3 3 3 3 f f 2 2 f . . . . . . . 
. . . . . . . . . . f 1 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . . 
. . . . . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . 
. . . . . . . . f f f f f f f f f f f 3 3 3 3 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 f f 2 2 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 3 f f 2 f 2 f . . . . . 
. . . . . . . . f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f 2 2 f . . . . . 
. . . . . . . . . f 2 f f f f f f f f f f 2 2 3 f 2 f . . . . . 
. . . . . . . . . . f c 8 9 8 9 9 9 9 9 8 f f 2 f 2 f . . . . . 
. . . . . . . . . . . b 1 8 9 8 9 9 9 9 9 8 b f f 2 f . . . . . 
. . . . . . . . . . . b f f 8 8 9 8 9 9 9 8 b 9 8 f . . . . . . 
. . . . . . . . f f . c b d f b 8 9 8 9 9 8 9 9 8 . . . . . . . 
. . . . . . . f d b f c d d 2 f f 8 8 9 1 8 9 9 8 . . . . . . . 
. . . . . . . f d d c f c 2 2 2 2 f f 8 9 8 9 9 9 8 . . . . . . 
. . . . . . . f 2 2 2 c f c 2 2 2 2 2 f f 9 9 8 8 . . . . . . . 
. . . . . . . . f 2 2 2 c f c 2 2 2 2 2 2 f 8 . . . . . . . . . 
. . . . . . . . . f 2 2 c f 2 c c 2 2 2 2 f . . . . . . . . . . 
. . . . . . . . . . f c c f 2 2 2 c c 2 2 f . . . . . . . . . . 
. . . . . . . . . . . f c f 2 2 2 2 2 2 2 f . . . . . . . . . . 
. . . . . . . . . . . . f f 2 2 2 2 2 2 f . . . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 2 2 f . . . . . . . . . . . 
. . . . . . . . . . . . . f 1 1 1 1 1 1 f . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f . . . . . . . . . . . . 
. . . . . . . . . . . . f 8 6 6 f 8 f . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . . . . . f f . f f . . . . . . . . . . . . . . 
`)
    SlashLeftClimb.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f 1 1 1 1 3 3 3 3 f f 2 2 f . . . . . . . 
. . . . . . . . . . f 1 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . . 
. . . . . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 f 2 2 f . . . . . 
. . . . . . . . f f f f f f f f f f f 3 3 3 3 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 f f 2 2 3 f 2 f . . . . . 
. . . . . . . f 3 3 3 3 3 3 3 3 3 3 3 3 3 f f 2 f 2 f . . . . . 
. . . . . . . . f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f 2 2 f . . . . . 
. . . . . . . . . f 2 f f f f f f f f f f 2 2 3 f 2 f . . . . . 
. . . . . . . . . . f c 8 9 8 9 9 9 9 9 8 f f 2 f 2 f . . . . . 
. . . . . . . . . . . b 1 8 9 8 9 8 9 9 9 8 b f f 2 f . . . . . 
. . . . . . . . . . . b f f 8 8 9 9 8 9 9 8 b 9 8 f . . . . . . 
. . . . . . . . . . . b f f d b 8 9 8 9 9 8 9 9 8 . . . . . . . 
. . . . . . . . . . . b f f d d b 8 8 9 1 8 9 9 8 . . . . . . . 
. . . . . . . . f f . c b d f d d b 8 9 8 9 9 9 9 8 . . . . . . 
. . . . . . . f b d f c d d 2 f f d b 8 f 9 9 8 8 . . . . . . . 
. . . . . . . f d d c f c 2 2 2 2 f f f . 8 8 . . . . . . . . . 
. . . . . . . . f 2 2 c f c 2 2 2 2 2 f f . 8 . . . . . . . . . 
. . . . . . . . . f 2 2 c f c 2 2 2 2 2 2 f . . . . . . . . . . 
. . . . . . . . . . f 2 c f 2 c c 2 2 2 2 f . . . . . . . . . . 
. . . . . . . . . . . f f f 2 2 2 c c 2 2 f . . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 2 2 f . . . . . . . . . . . 
. . . . . . . . . . . . . f 2 2 2 2 2 2 f . . . . . . . . . . . 
. . . . . . . . . . . . . f 1 1 1 1 1 1 f . . . . . . . . . . . 
. . . . . . . . . . . . . f 1 1 1 1 1 1 f . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f . . . . . . . . . . . . 
. . . . . . . . . . . . f 8 6 6 f 8 f . . . . . . . . . . . . . 
. . . . . . . . . . . . f 8 6 6 f 8 f . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . . . . . f f . f f . . . . . . . . . . . . . . 
`)
}
function SoulLeftFace () {
    SoulLeftWalk = animation.createAnimation(ActionKind.SoulLeftWalk, 166.66)
    animation.attachAnimation(HeroPlayer, SoulLeftWalk)
    SoulLeftWalk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . 8 . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . 8 8 . . . . . . . . . . . 
. . . . . . . . . . . . . 8 8 8 8 8 8 8 a 8 8 . . . . . . . . . 
. . . . . . . . . . . . 8 1 1 a a a a a a a a 8 . . . . . . . . 
. . . . . . . . . . . 8 1 f f f f a a a a a a a 8 . . . . . . . 
. . . . . . . . . . 8 f f a a a a f f a a 1 a a a 8 . . . . . . 
. . . . . . . . . . 8 a 8 a a 1 a a a f a a 1 a a 8 . . . . . . 
. . . . . . . . . . 8 1 a 8 a a 1 a a 8 f a a 1 a 8 . . . . . . 
. . . . . . . . . . 8 a 8 b 8 a a a a a 8 f a 1 a 8 . . . . . . 
. . . . . . . . . . 8 8 b d 8 a a a a a 8 f a a a 8 . . . . . . 
. . . . . . . . . . . b 1 f b 8 a 8 a a a 8 a a a 8 . . . . . . 
. . . . . . . . . . . b f f b 8 a a 8 a a 8 a a 8 . . . . . . . 
. . . . . . . . . . . b f f d b 8 a 8 a a 8 a a 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 8 a 1 8 a a 8 . . . . . . . 
. . . . . . . . . . . f d d d d d b 8 a 1 8 a a 8 . . . . . . . 
. . . . . . . . . . . . f d d d d b 8 1 8 a a 8 . . . . . . . . 
. . . . . . . . . . . . . f f f f f f 8 8 a a 8 . . . . . . . . 
. . . . . . . . . . . . . . . c f f f 8 . 8 8 . . . . . . . . . 
. . . . . . . . . . . . . . c f f f f c c c 8 . . . . . . . . . 
. . . . . . . . . . . . . c f f f f f f f f c . . . . . . . . . 
. . . . . . . . . . . . . c f f f c f f f f f . . . . . . . . . 
. . . . . . . . . . . . . f f f f c f f f f f f . . . . . . . . 
. . . . . . . . . . . . f f f f f c f f f f f f . . . . . . . . 
. . . . . . . . . . . f c f f f f f c f f f f f f . . . . . . . 
. . . . . . . . . . . f c f f f f f c f f f f f f f . . . . . . 
. . . . . . . . . . . . f f f f f f c f f f f f f f . . . . . . 
. . . . . . . . . . . . . f f f f f f c f f f f f . . . . . . . 
. . . . . . . . . . . . f f f f f f f f c c c . . . . . . . . . 
. . . . . . . . . . . f f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f f f f f f f f f f f f f f . . . . . . . 
. . . . . . . . . . . f f f f f f f f f f f f f f . . . . . . . 
`)
    SoulLeftWalk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . 8 . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . 8 8 . . . . . . . . . . . 
. . . . . . . . . . . . . 8 8 8 8 8 8 a a 8 8 . . . . . . . . . 
. . . . . . . . . . . . 8 1 1 1 a a a a a a a 8 . . . . . . . . 
. . . . . . . . . . . 8 1 f f f f a a a a a a a 8 . . . . . . . 
. . . . . . . . . . 8 1 f a a a a f f a a a a a a 8 . . . . . . 
. . . . . . . . . . 8 f 8 a a a a a f f a 1 a a a 8 . . . . . . 
. . . . . . . . . . 8 a a 8 a 1 a a a 8 f a 1 a a 8 . . . . . . 
. . . . . . . . . . 8 1 8 b 8 a 1 a a a 8 f a 1 a 8 . . . . . . 
. . . . . . . . . . . 8 8 d 8 a a a a a a 8 a 1 a 8 . . . . . . 
. . . . . . . . . . . b 1 f b 8 a 8 a a a 8 a a a 8 . . . . . . 
. . . . . . . . . . . b f f b 8 a a 8 a a 8 a a a 8 . . . . . . 
. . . . . . . . . . . b f f d b 8 a 8 a a a 8 a 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 8 8 a a 8 a 8 . . . . . . . 
. . . . . . . . . . . f d d d d d b b 8 a 1 8 a 8 . . . . . . . 
. . . . . . . . . . . . f d d d d d b 8 1 8 a a 8 . . . . . . . 
. . . . . . . . . . . . . f f f f f f f 8 a a 8 . . . . . . . . 
. . . . . . . . . . . . . . c c f f f f 8 c 8 . . . . . . . . . 
. . . . . . . . . . . . . c f f f f f f f f c . . . . . . . . . 
. . . . . . . . . . . . . c f f f f c f f f f f . . . . . . . . 
. . . . . . . . . . . . . f f f f f c f f f f f . . . . . . . . 
. . . . . . . . . . . . . f f f f c f f f f f c . . . . . . . . 
. . . . . . . . . . . . . f f f f c f f f f f c . . . . . . . . 
. . . . . . . . . . . . . f f f c f f f f f f c . . . . . . . . 
. . . . . . . . . . . . f f f f c f f f f f c . . . . . . . . . 
. . . . . . . . . . . f f f f f f c c c c c f . . . . . . . . . 
. . . . . . . . . . . f f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f f f f f f f f f f f f f f . . . . . . . 
. . . . . . . . . . . f f f f f f f f f f f f f f f . . . . . . 
`)
    SoulLeftWalk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . 8 . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . 8 8 . . . . . . . . . . . 
. . . . . . . . . . . . . 8 8 8 8 8 8 8 a 8 8 . . . . . . . . . 
. . . . . . . . . . . . 8 1 1 a a a a a a a a 8 . . . . . . . . 
. . . . . . . . . . . 8 1 f f f f a a a a a a a 8 . . . . . . . 
. . . . . . . . . . 8 f f a a a a f f a a 1 a a a 8 . . . . . . 
. . . . . . . . . . 8 a 8 a a 1 a a a f a a 1 a a 8 . . . . . . 
. . . . . . . . . . 8 1 a 8 a a 1 a a 8 f a a 1 a 8 . . . . . . 
. . . . . . . . . . 8 a 8 b 8 a a a a a 8 f a 1 a 8 . . . . . . 
. . . . . . . . . . 8 8 b d 8 a a a a a 8 f a a a 8 . . . . . . 
. . . . . . . . . . . b 1 f b 8 a 8 a a a 8 a a a 8 . . . . . . 
. . . . . . . . . . . b f f b 8 a a 8 a a 8 a a 8 . . . . . . . 
. . . . . . . . . . . b f f d b 8 a 8 a a 8 a a 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 8 a 1 8 a a 8 . . . . . . . 
. . . . . . . . . . . f d d d d d b 8 a 1 8 a a 8 . . . . . . . 
. . . . . . . . . . . . f d d d d b 8 1 8 a a 8 . . . . . . . . 
. . . . . . . . . . . . . f f f f f f 8 8 a a 8 . . . . . . . . 
. . . . . . . . . . . . . . . c f f f 8 . 8 8 . . . . . . . . . 
. . . . . . . . . . . . . . c f f f f c c c 8 . . . . . . . . . 
. . . . . . . . . . . . . c f f f f f f f f c . . . . . . . . . 
. . . . . . . . . . . . . c f f f f f f f f f . . . . . . . . . 
. . . . . . . . . . . . . f f f c f f f f f f . . . . . . . . . 
. . . . . . . . . . . . . f f c f f f f f f f . . . . . . . . . 
. . . . . . . . . . . . f f c f f f f f f f f . . . . . . . . . 
. . . . . . . . . . . . f f c f f f f f f f c . . . . . . . . . 
. . . . . . . . . . . . . f c f f f f f f c . . . . . . . . . . 
. . . . . . . . . . . . . f f c f f f f f c f . . . . . . . . . 
. . . . . . . . . . . . . f f f c c c c c f f f . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f f . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f f f . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f f f . . . . . . 
`)
    SoulLeftWalk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . 8 . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . 8 8 . . . . . . . . . . . 
. . . . . . . . . . . . . 8 8 8 8 8 8 a a 8 8 . . . . . . . . . 
. . . . . . . . . . . . 8 1 1 1 a a a a a a a 8 . . . . . . . . 
. . . . . . . . . . . 8 1 f f f f a a a a a a a 8 . . . . . . . 
. . . . . . . . . . 8 1 f a a a a f f a a a a a a 8 . . . . . . 
. . . . . . . . . . 8 f 8 a a a a a f f a 1 a a a 8 . . . . . . 
. . . . . . . . . . 8 a a 8 a 1 a a a 8 f a 1 a a 8 . . . . . . 
. . . . . . . . . . 8 1 8 b 8 a 1 a a a 8 f a 1 a 8 . . . . . . 
. . . . . . . . . . . 8 8 d 8 a a a a a a 8 a 1 a 8 . . . . . . 
. . . . . . . . . . . b 1 f b 8 a 8 a a a 8 a a a 8 . . . . . . 
. . . . . . . . . . . b f f b 8 a a 8 a a 8 a a a 8 . . . . . . 
. . . . . . . . . . . b f f d b 8 a 8 a a a 8 a 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 8 8 a a 8 a 8 . . . . . . . 
. . . . . . . . . . . f d d d d d b b 8 a 1 8 a 8 . . . . . . . 
. . . . . . . . . . . . f d d d d d b 8 1 8 a a 8 . . . . . . . 
. . . . . . . . . . . . . f f f f f f f 8 a a 8 . . . . . . . . 
. . . . . . . . . . . . . . c c f f f f 8 c 8 . . . . . . . . . 
. . . . . . . . . . . . . c f f f f f f f f c . . . . . . . . . 
. . . . . . . . . . . . . c f f f f c f f f f f . . . . . . . . 
. . . . . . . . . . . . . f f f f f c f f f f f . . . . . . . . 
. . . . . . . . . . . . . f f f f c f f f f f c . . . . . . . . 
. . . . . . . . . . . . . f f f f c f f f f f c . . . . . . . . 
. . . . . . . . . . . . . f f f c f f f f f f c . . . . . . . . 
. . . . . . . . . . . . f f f f c f f f f f c . . . . . . . . . 
. . . . . . . . . . . f f f f f f c c c c c f . . . . . . . . . 
. . . . . . . . . . . f f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f f f f f f f f f f f f f f . . . . . . . 
. . . . . . . . . . . f f f f f f f f f f f f f f f . . . . . . 
`)
    SoulLeftIdle = animation.createAnimation(ActionKind.SoulLeftIdle, 250)
    animation.attachAnimation(HeroPlayer, SoulLeftIdle)
    SoulLeftIdle.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . 8 . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . 8 8 . . . . . . . . . . . 
. . . . . . . . . . . . . 8 8 8 8 8 8 8 a 8 8 . . . . . . . . . 
. . . . . . . . . . . . 8 1 1 a a a a a a a a 8 . . . . . . . . 
. . . . . . . . . . . 8 1 f f f f a a a a a a a 8 . . . . . . . 
. . . . . . . . . . 8 f f a a a a f f a a 1 a a a 8 . . . . . . 
. . . . . . . . . . 8 a 8 a a 1 a a a f a a 1 a a 8 . . . . . . 
. . . . . . . . . . 8 1 a 8 a a 1 a a 8 f a a 1 a 8 . . . . . . 
. . . . . . . . . . 8 a 8 b 8 a a a a a 8 f a 1 a 8 . . . . . . 
. . . . . . . . . . 8 8 b d 8 a a a a a 8 f a a a 8 . . . . . . 
. . . . . . . . . . . b 1 f b 8 a 8 a a a 8 a a a 8 . . . . . . 
. . . . . . . . . . . b f f b 8 a a 8 a a 8 a a 8 . . . . . . . 
. . . . . . . . . . . b f f d b 8 a 8 a a 8 a a 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 8 a 1 8 a a 8 . . . . . . . 
. . . . . . . . . . . f d d d d d b 8 a 1 8 a a 8 . . . . . . . 
. . . . . . . . . . . . f d d d d b 8 1 8 a a 8 . . . . . . . . 
. . . . . . . . . . . . . f f f f f f 8 8 a a 8 . . . . . . . . 
. . . . . . . . . . . . . . . c f f f 8 . 8 8 . . . . . . . . . 
. . . . . . . . . . . . . . c f f f f c c c 8 . . . . . . . . . 
. . . . . . . . . . . . . c f f f f f f f f c . . . . . . . . . 
. . . . . . . . . . . . . c f f f c f f f f f . . . . . . . . . 
. . . . . . . . . . . . . f f f f c f f f f f f . . . . . . . . 
. . . . . . . . . . . . f f f f f c f f f f f f . . . . . . . . 
. . . . . . . . . . . f c f f f f f c f f f f f f . . . . . . . 
. . . . . . . . . . . f c f f f f f c f f f f f f f . . . . . . 
. . . . . . . . . . . . f f f f f f c f f f f f f f . . . . . . 
. . . . . . . . . . . . . f f f f f f c f f f f f . . . . . . . 
. . . . . . . . . . . . f f f f f f f f c c c . . . . . . . . . 
. . . . . . . . . . . f f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f f f f f f f f f f f f f f . . . . . . . 
. . . . . . . . . . . f f f f f f f f f f f f f f . . . . . . . 
`)
    SoulLeftIdle.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . 8 . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . 8 8 . . . . . . . . . . . 
. . . . . . . . . . . . . 8 8 8 8 8 8 a a 8 8 . . . . . . . . . 
. . . . . . . . . . . . 8 1 1 1 a a a a a a a 8 . . . . . . . . 
. . . . . . . . . . . 8 1 f f f f a a a a a a a 8 . . . . . . . 
. . . . . . . . . . 8 1 f a a a a f f a a a a a a 8 . . . . . . 
. . . . . . . . . . 8 f 8 a a a a a f f a 1 a a a 8 . . . . . . 
. . . . . . . . . . 8 a a 8 a 1 a a a 8 f a 1 a a 8 . . . . . . 
. . . . . . . . . . 8 1 8 b 8 a 1 a a a 8 f a 1 a 8 . . . . . . 
. . . . . . . . . . . 8 8 d 8 a a a a a a 8 a 1 a 8 . . . . . . 
. . . . . . . . . . . b 1 f b 8 a 8 a a a 8 a a a 8 . . . . . . 
. . . . . . . . . . . b f f b 8 a a 8 a a 8 a a a 8 . . . . . . 
. . . . . . . . . . . b f f d b 8 a 8 a a a 8 a 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 8 8 a a 8 a 8 . . . . . . . 
. . . . . . . . . . . f d d d d d b b 8 a 1 8 a 8 . . . . . . . 
. . . . . . . . . . . . f d d d d d b 8 1 8 a a 8 . . . . . . . 
. . . . . . . . . . . . . f f f f f f f 8 a a 8 . . . . . . . . 
. . . . . . . . . . . . . . c c f f f f 8 c 8 . . . . . . . . . 
. . . . . . . . . . . . . c f f f f f f f f c . . . . . . . . . 
. . . . . . . . . . . . . c f f f f f f f f f . . . . . . . . . 
. . . . . . . . . . . . . f f f f f c f f f f f . . . . . . . . 
. . . . . . . . . . . . . f f f f f c f f f f f f . . . . . . . 
. . . . . . . . . . . . f f f f f f c f f f f f f f . . . . . . 
. . . . . . . . . . . f c f f f f f f c f f f f f f f . . . . . 
. . . . . . . . . . . f c f f f f f f c f f f f f f f . . . . . 
. . . . . . . . . . . . f f f f f f f f c f f f f f . . . . . . 
. . . . . . . . . . . f f f f f f f f f f c c c c . . . . . . . 
. . . . . . . . . . . f f f f f f f f f f f f f f . . . . . . . 
. . . . . . . . . . f f f f f f f f f f f f f f f f . . . . . . 
`)
    SoulLeftWalkAtk = animation.createAnimation(ActionKind.SoulLeftWalkAtk, 166.66)
    animation.attachAnimation(HeroPlayer, SoulLeftWalkAtk)
    SoulLeftWalkAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . 8 . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . 8 8 . . . . . . . . . . . 
. . . . . . . . . . . . . 8 8 8 8 8 8 a a 8 8 . . . . . . . . . 
. . . . . . . . . . . . 8 1 1 1 a a a a a a a 8 . . . . . . . . 
. . . . . . . . . . . 8 1 f f f f a a a a a a a 8 . . . . . . . 
. . . . . . . . . . 8 1 f a a a a f f a a a a a a 8 . . . . . . 
. . . . . . . . . . 8 f 8 a a a a a f f a 1 a a a 8 . . . . . . 
. . . . . . . . . . 8 a a 8 a 1 a a a 8 f a 1 a a 8 . . . . . . 
. . . . . . . . . . 8 1 8 b 8 a 1 a a a 8 f a 1 a 8 . . . . . . 
. . . . . . . . . . . 8 8 d 8 a a a a a a 8 a 1 a 8 . . . . . . 
. . . . . . . . . . . b 1 f b 8 a 8 a a a 8 a a a 8 . . . . . . 
. . . . . . . . . . . b f f b 8 a a 8 a a 8 a a a 8 . . . . . . 
. . . . . . . . . . . b f f d b 8 a 8 a a a 8 a 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 8 8 a a 8 a 8 . . . . . . . 
. . . . . . . . . . . f d d d d d b b 8 a 1 8 a 8 . . . . . . . 
. . . . . . . . . . . . f d d d d d b 8 1 8 a a 8 . . . . . . . 
. . . . . . . . . . . . . f f f f f f f 8 a a 8 . . . . . . . . 
. . . . . . . f f f f . . c c c f f f f 8 c 8 . . . . . . . . . 
. . . . . . f f f f f f c f f f f f f f f f c . . . . . . . . . 
. . . . . f f f f f f f c f f f f f c f f f f f . . . . . . . . 
. . . . . f f f f f f f c f f f f f c f f f f f . . . . . . . . 
. . . . . f f f f f f f c f f f f c f f f f f c . . . . . . . . 
. . . . . . f f f f f f c f f f f c f f f f f c . . . . . . . . 
. . . . . . . . f f f c . f f f c f f f f f f c . . . . . . . . 
. . . . . . . . . . . . f f f f c f f f f f c . . . . . . . . . 
. . . . . . . . . . . f f f f f f c c c c c f . . . . . . . . . 
. . . . . . . . . . . f f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f f f f f f f f f f f f f f . . . . . . . 
. . . . . . . . . . . f f f f f f f f f f f f f f f . . . . . . 
`)
    SoulLeftWalkAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . 8 . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . 8 8 . . . . . . . . . . . 
. . . . . . . . . . . . . 8 8 8 8 8 8 8 a 8 8 . . . . . . . . . 
. . . . . . . . . . . . 8 1 1 a a a a a a a a 8 . . . . . . . . 
. . . . . . . . . . . 8 1 f f f f a a a a a a a 8 . . . . . . . 
. . . . . . . . . . 8 f f a a a a f f a a 1 a a a 8 . . . . . . 
. . . . . . . . . . 8 a 8 a a 1 a a a f a a 1 a a 8 . . . . . . 
. . . . . . . . . . 8 1 a 8 a a 1 a a 8 f a a 1 a 8 . . . . . . 
. . . . . . . . . . 8 a 8 b 8 a a a a a 8 f a 1 a 8 . . . . . . 
. . . . . . . . . . 8 8 b d 8 a a a a a 8 f a a a 8 . . . . . . 
. . . . . . . . . . . b 1 f b 8 a 8 a a a 8 a a a 8 . . . . . . 
. . . . . . . . . . . b f f b 8 a a 8 a a 8 a a 8 . . . . . . . 
. . . . . . . . . . . b f f d b 8 a 8 a a 8 a a 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 8 a 1 8 a a 8 . . . . . . . 
. . . . . . . . . . . f d d d d d b 8 a 1 8 a a 8 . . . . . . . 
. . . . . . . . . . . . f d d d d b 8 1 8 a a 8 . . . . . . . . 
. . . . . . . . . . . . . f f f f f f 8 8 a a 8 . . . . . . . . 
. . . . . . f f f f . . . . . c f f f 8 . 8 8 . . . . . . . . . 
. . . . . f f f f f f f f c c f f f f c c c 8 . . . . . . . . . 
. . . . . f f f f f f f c f f f f f f f f f c . . . . . . . . . 
. . . . . f f f f f f f c f f f f c f f f f f . . . . . . . . . 
. . . . . f f f f f f f c f f f f c f f f f f f . . . . . . . . 
. . . . . . f f f f f f c f f f f c f f f f f f . . . . . . . . 
. . . . . . . f f f f c . f f f f f c f f f f f f . . . . . . . 
. . . . . . . . . . . . . f f f f f c f f f f f f f . . . . . . 
. . . . . . . . . . . . . f f f f f c f f f f f f f . . . . . . 
. . . . . . . . . . . . . f f f f f f c f f f f f . . . . . . . 
. . . . . . . . . . . . f f f f f f f f c c c . . . . . . . . . 
. . . . . . . . . . . f f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f f f f f f f f f f f f f f . . . . . . . 
. . . . . . . . . . . f f f f f f f f f f f f f f . . . . . . . 
`)
    SoulLeftWalkAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . 8 . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . 8 8 . . . . . . . . . . . 
. . . . . . . . . . . . . 8 8 8 8 8 8 8 a 8 8 . . . . . . . . . 
. . . . . . . . . . . . 8 1 1 a a a a a a a a 8 . . . . . . . . 
. . . . . . . . . . . 8 1 f f f f a a a a a a a 8 . . . . . . . 
. . . . . . . . . . 8 f f a a a a f f a a 1 a a a 8 . . . . . . 
. . . . . . . . . . 8 a 8 a a 1 a a a f a a 1 a a 8 . . . . . . 
. . . . . . . . . . 8 1 a 8 a a 1 a a 8 f a a 1 a 8 . . . . . . 
. . . . . . . . . . 8 a 8 b 8 a a a a a 8 f a 1 a 8 . . . . . . 
. . . . . . . . . . 8 8 b d 8 a a a a a 8 f a a a 8 . . . . . . 
. . . . . . . . . . . b 1 f b 8 a 8 a a a 8 a a a 8 . . . . . . 
. . . . . . . . . . . b f f b 8 a a 8 a a 8 a a 8 . . . . . . . 
. . . . . . . . . . . b f f d b 8 a 8 a a 8 a a 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 8 a 1 8 a a 8 . . . . . . . 
. . . . . . . . . . . f d d d d d b 8 a 1 8 a a 8 . . . . . . . 
. . . . . . . . . . . . f d d d d b 8 1 8 a a 8 . . . . . . . . 
. . . . . . . . . . . . . f f f f f f 8 8 a a 8 . . . . . . . . 
. . . . . . . f f f f . . . . c f f f 8 . 8 8 . . . . . . . . . 
. . . . . . f f f f f f f c c f f f f c c c 8 . . . . . . . . . 
. . . . . f f f f f f f c f f f f f f f f f c . . . . . . . . . 
. . . . . f f f f f f f c f f f f f f f f f f . . . . . . . . . 
. . . . . f f f f f f f c f f f c f f f f f f . . . . . . . . . 
. . . . . f f f f f f f c f f c f f f f f f f . . . . . . . . . 
. . . . . . f f f f f c . f c f f f f f f f f . . . . . . . . . 
. . . . . . . . . . . . . f c f f f f f f f c . . . . . . . . . 
. . . . . . . . . . . . . f c f f f f f f c . . . . . . . . . . 
. . . . . . . . . . . . . f f c f f f f f c f . . . . . . . . . 
. . . . . . . . . . . . . f f f c c c c c f f f . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f f . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f f f . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f f f . . . . . . 
`)
    SoulLeftWalkAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . 8 . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . 8 8 . . . . . . . . . . . 
. . . . . . . . . . . . . 8 8 8 8 8 8 8 a 8 8 . . . . . . . . . 
. . . . . . . . . . . . 8 1 1 a a a a a a a a 8 . . . . . . . . 
. . . . . . . . . . . 8 1 f f f f a a a a a a a 8 . . . . . . . 
. . . . . . . . . . 8 f f a a a a f f a a 1 a a a 8 . . . . . . 
. . . . . . . . . . 8 a 8 a a 1 a a a f a a 1 a a 8 . . . . . . 
. . . . . . . . . . 8 1 a 8 a a 1 a a 8 f a a 1 a 8 . . . . . . 
. . . . . . . . . . 8 a 8 b 8 a a a a a 8 f a 1 a 8 . . . . . . 
. . . . . . . . . . 8 8 b d 8 a a a a a 8 f a a a 8 . . . . . . 
. . . . . . . . . . . b 1 f b 8 a 8 a a a 8 a a a 8 . . . . . . 
. . . . . . . . . . . b f f b 8 a a 8 a a 8 a a 8 . . . . . . . 
. . . . . . . . . . . b f f d b 8 a 8 a a 8 a a 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 8 a 1 8 a a 8 . . . . . . . 
. . . . . . . . . . . f d d d d d b 8 a 1 8 a a 8 . . . . . . . 
. . . . . . . . . . . . f d d d d b 8 1 8 a a 8 . . . . . . . . 
. . . . . . . . . . . . . f f f f f f 8 8 a a 8 . . . . . . . . 
. . . . . . f f f f . . . . . c f f f 8 . 8 8 . . . . . . . . . 
. . . . . f f f f f f f f c c f f f f c c c 8 . . . . . . . . . 
. . . . . f f f f f f f c f f f f f f f f f c . . . . . . . . . 
. . . . . f f f f f f f c f f f f c f f f f f . . . . . . . . . 
. . . . . f f f f f f f c f f f f c f f f f f f . . . . . . . . 
. . . . . . f f f f f f c f f f f c f f f f f f . . . . . . . . 
. . . . . . . f f f f c . f f f f f c f f f f f f . . . . . . . 
. . . . . . . . . . . . . f f f f f c f f f f f f f . . . . . . 
. . . . . . . . . . . . . f f f f f c f f f f f f f . . . . . . 
. . . . . . . . . . . . . f f f f f f c f f f f f . . . . . . . 
. . . . . . . . . . . . f f f f f f f f c c c . . . . . . . . . 
. . . . . . . . . . . f f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f f f f f f f f f f f f f f . . . . . . . 
. . . . . . . . . . . f f f f f f f f f f f f f f . . . . . . . 
`)
    SoulLeftIdleAtk = animation.createAnimation(ActionKind.SoulLeftIdleAtk, 250)
    animation.attachAnimation(HeroPlayer, SoulLeftIdleAtk)
    SoulLeftIdleAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . 8 . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . 8 8 . . . . . . . . . . . 
. . . . . . . . . . . . . 8 8 8 8 8 8 8 a 8 8 . . . . . . . . . 
. . . . . . . . . . . . 8 1 1 a a a a a a a a 8 . . . . . . . . 
. . . . . . . . . . . 8 1 f f f f a a a a a a a 8 . . . . . . . 
. . . . . . . . . . 8 f f a a a a f f a a 1 a a a 8 . . . . . . 
. . . . . . . . . . 8 a 8 a a 1 a a a f a a 1 a a 8 . . . . . . 
. . . . . . . . . . 8 1 a 8 a a 1 a a 8 f a a 1 a 8 . . . . . . 
. . . . . . . . . . 8 a 8 b 8 a a a a a 8 f a 1 a 8 . . . . . . 
. . . . . . . . . . 8 8 b d 8 a a a a a 8 f a a a 8 . . . . . . 
. . . . . . . . . . . b 1 f b 8 a 8 a a a 8 a a a 8 . . . . . . 
. . . . . . . . . . . b f f b 8 a a 8 a a 8 a a 8 . . . . . . . 
. . . . . . . . . . . b f f d b 8 a 8 a a 8 a a 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 8 a 1 8 a a 8 . . . . . . . 
. . . . . . . . . . . f d d d d d b 8 a 1 8 a a 8 . . . . . . . 
. . . . . . . . . . . . f d d d d b 8 1 8 a a 8 . . . . . . . . 
. . . . . . . . . . . . . f f f f f f 8 8 a a 8 . . . . . . . . 
. . . . . . f f f f . . . . . c f f f 8 . 8 8 . . . . . . . . . 
. . . . . f f f f f f f f c c f f f f c c c 8 . . . . . . . . . 
. . . . . f f f f f f f c f f f f f f f f f c . . . . . . . . . 
. . . . . f f f f f f f c f f f f c f f f f f . . . . . . . . . 
. . . . . f f f f f f f c f f f f c f f f f f f . . . . . . . . 
. . . . . . f f f f f f c f f f f c f f f f f f . . . . . . . . 
. . . . . . . f f f f c . f f f f f c f f f f f f . . . . . . . 
. . . . . . . . . . . . . f f f f f c f f f f f f f . . . . . . 
. . . . . . . . . . . . . f f f f f c f f f f f f f . . . . . . 
. . . . . . . . . . . . . f f f f f f c f f f f f . . . . . . . 
. . . . . . . . . . . . f f f f f f f f c c c . . . . . . . . . 
. . . . . . . . . . . f f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . f f f f f f f f f f f f f f . . . . . . . 
. . . . . . . . . . . f f f f f f f f f f f f f f . . . . . . . 
`)
    SoulLeftIdleAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . 8 . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . 8 8 . . . . . . . . . . . 
. . . . . . . . . . . . . 8 8 8 8 8 8 a a 8 8 . . . . . . . . . 
. . . . . . . . . . . . 8 1 1 1 a a a a a a a 8 . . . . . . . . 
. . . . . . . . . . . 8 1 f f f f a a a a a a a 8 . . . . . . . 
. . . . . . . . . . 8 1 f a a a a f f a a a a a a 8 . . . . . . 
. . . . . . . . . . 8 f 8 a a a a a f f a 1 a a a 8 . . . . . . 
. . . . . . . . . . 8 a a 8 a 1 a a a 8 f a 1 a a 8 . . . . . . 
. . . . . . . . . . 8 1 8 b 8 a 1 a a a 8 f a 1 a 8 . . . . . . 
. . . . . . . . . . . 8 8 d 8 a a a a a a 8 a 1 a 8 . . . . . . 
. . . . . . . . . . . b 1 f b 8 a 8 a a a 8 a a a 8 . . . . . . 
. . . . . . . . . . . b f f b 8 a a 8 a a 8 a a a 8 . . . . . . 
. . . . . . . . . . . b f f d b 8 a 8 a a a 8 a 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 8 8 a a 8 a 8 . . . . . . . 
. . . . . . . . . . . f d d d d d b b 8 a 1 8 a 8 . . . . . . . 
. . . . . . . . . . . . f d d d d d b 8 1 8 a a 8 . . . . . . . 
. . . . . . . . . . . . . f f f f f f f 8 a a 8 . . . . . . . . 
. . . . . . . f f f f . . c c c f f f f 8 c 8 . . . . . . . . . 
. . . . . . f f f f f f c f f f f f f f f f c . . . . . . . . . 
. . . . . f f f f f f f c f f f f f f f f f f . . . . . . . . . 
. . . . . f f f f f f f c f f f f f c f f f f f . . . . . . . . 
. . . . . f f f f f f f c f f f f f c f f f f f f . . . . . . . 
. . . . . . f f f f f f c f f f f f c f f f f f f f . . . . . . 
. . . . . . . . f f f c . f f f f f f c f f f f f f f . . . . . 
. . . . . . . . . . . . . f f f f f f c f f f f f f f . . . . . 
. . . . . . . . . . . . f f f f f f f f c f f f f f . . . . . . 
. . . . . . . . . . . f f f f f f f f f f c c c c . . . . . . . 
. . . . . . . . . . . f f f f f f f f f f f f f f . . . . . . . 
. . . . . . . . . . f f f f f f f f f f f f f f f f . . . . . . 
`)
    SoulLeftJump = animation.createAnimation(ActionKind.SoulLeftJump, 250)
    animation.attachAnimation(HeroPlayer, SoulLeftJump)
    SoulLeftJump.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . 8 . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . 8 8 . . . . . . . . . . . 
. . . . . . . . . . . . . 8 8 8 8 8 8 8 a 8 8 . . . . . . . . . 
. . . . . . . . . . . . 8 1 1 a a a a a a a a 8 . . . . . . . . 
. . . . . . . . . . . 8 1 f f f f a a a a a a a 8 . . . . . . . 
. . . . . . . . . . 8 f f a a a a f f a a 1 a a a 8 . . . . . . 
. . . . . . . . . . 8 a 8 a a 1 a a a f a a 1 a a 8 . . . . . . 
. . . . . . . . . . 8 1 a 8 a a 1 a a 8 f a a 1 a 8 . . . . . . 
. . . . . . . . . . 8 a 8 b 8 a a a a a 8 f a 1 a 8 . . . . . . 
. . . . . . . . . . 8 8 b d 8 a a a a a 8 f a a a 8 . . . . . . 
. . . . . . . . . . . b 1 f b 8 a 8 a a a 8 a a a 8 . . . . . . 
. . . . . . . . . . . b f f b 8 a a 8 a a 8 a a 8 . . . . . . . 
. . . . . . . . . . . b f f d b 8 a 8 a a 8 a a 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 8 a 1 8 a a 8 . . . . . . . 
. . . . . . . . . . . f d d d d d b 8 a 1 8 a a 8 . . . . . . . 
. . . . . . . . . . . . f d d d d b 8 1 8 a a 8 . . . . . . . . 
. . . . . . . . . . . . . f f f f f f 8 8 a a 8 . . . . . . . . 
. . . . . . . . . . . . . . c c f f f 8 . 8 8 . . . . . . . . . 
. . . . . . . . . . . . . c f f f f f c c c c . . . . . . . . . 
. . . . . . . . . . . . c f f f f f f f f f f c . . . . . . . . 
. . . . . . . . . . . . c f f f f f f f f f f f f f . . . . . . 
. . . . . . . . . . . . c f f f f f f f f f f f f f f . . . . . 
. . . . . . . . . . . . c f f f f c f f f f f f f f f f . . . . 
. . . . . . . . . . . . c f f f f f c c f f f f f f f f . . . . 
. . . . . . . . . . . . c f f f f f f f c c f f f f f f . . . . 
. . . . . . . . . . . . . f f f f f f f f f c f f f f . . . . . 
. . . . . . . . . . . . . f f f f f f f f f . . . . . . . . . . 
. . . . . . . . . . . . . f f f f f f f f f f . . . . . . . . . 
. . . . . . . . . . . . . f f f f f f f f f f . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f f . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f f f . . . . . . 
. . . . . . . . . . . . . f f f f f f f f f f f f . . . . . . . 
`)
    SoulLeftJump.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . 8 . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . 8 8 . . . . . . . . . . . 
. . . . . . . . . . . . . 8 8 8 8 8 8 a a 8 8 . . . . . . . . . 
. . . . . . . . . . . . 8 1 1 1 a a a a a a a 8 . . . . . . . . 
. . . . . . . . . . . 8 1 f f f f a a a a a a a 8 . . . . . . . 
. . . . . . . . . . 8 1 f a a a a f f a a a a a a 8 . . . . . . 
. . . . . . . . . . 8 f 8 a a a a a f f a 1 a a a 8 . . . . . . 
. . . . . . . . . . 8 a a 8 a 1 a a a 8 f a 1 a a 8 . . . . . . 
. . . . . . . . . . 8 1 8 b 8 a 1 a a a 8 f a 1 a 8 . . . . . . 
. . . . . . . . . . . 8 8 d 8 a a a a a a 8 a 1 a 8 . . . . . . 
. . . . . . . . . . . b 1 f b 8 a 8 a a a 8 a a a 8 . . . . . . 
. . . . . . . . . . . b f f b 8 a a 8 a a 8 a a a 8 . . . . . . 
. . . . . . . . . . . b f f d b 8 a 8 a a a 8 a 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 8 8 a a 8 a 8 . . . . . . . 
. . . . . . . . . . . f d d d d d b b 8 a 1 8 a 8 . . . . . . . 
. . . . . . . . . . . . f d d d d d b 8 1 8 a a 8 . . . . . . . 
. . . . . . . . . . . . . f f f f f f f 8 a a 8 . . . . . . . . 
. . . . . . . . . . . . . c c f f f f c 8 c 8 . . . . . . . . . 
. . . . . . . . . . . . c f f f f f f f f f c c . . . . . . . . 
. . . . . . . . . . . . c f f f f f f f f f f f f f f f . . . . 
. . . . . . . . . . . . c f f f f f f f f f f f f f f f f . . . 
. . . . . . . . . . . . c f f f f f f f f f f f f f f f f . . . 
. . . . . . . . . . . . c f f f f c f f f f f f f f f f f . . . 
. . . . . . . . . . . . c f f f f f c c f f f f f f f f f . . . 
. . . . . . . . . . . . c f f f f f f f c c f f f f f f . . . . 
. . . . . . . . . . . . . f f f f f f f f f c f f f f . . . . . 
. . . . . . . . . . . . . f f f f f f f f f f . . . . . . . . . 
. . . . . . . . . . . . . f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f f f f . . . . . . 
. . . . . . . . . . . . . f f f f f f f f f f f f . . . . . . . 
. . . . . . . . . . . . . . f f f f f f f f f f . . . . . . . . 
`)
    SoulLeftJumpAtk = animation.createAnimation(ActionKind.SoulLeftJumpAtk, 250)
    animation.attachAnimation(HeroPlayer, SoulLeftJumpAtk)
    SoulLeftJumpAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . 8 . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . 8 8 . . . . . . . . . . . 
. . . . . . . . . . . . . 8 8 8 8 8 8 8 a 8 8 . . . . . . . . . 
. . . . . . . . . . . . 8 1 1 a a a a a a a a 8 . . . . . . . . 
. . . . . . . . . . . 8 1 f f f f a a a a a a a 8 . . . . . . . 
. . . . . . . . . . 8 f f a a a a f f a a 1 a a a 8 . . . . . . 
. . . . . . . . . . 8 a 8 a a 1 a a a f a a 1 a a 8 . . . . . . 
. . . . . . . . . . 8 1 a 8 a a 1 a a 8 f a a 1 a 8 . . . . . . 
. . . . . . . . . . 8 a 8 b 8 a a a a a 8 f a 1 a 8 . . . . . . 
. . . . . . . . . . 8 8 b d 8 a a a a a 8 f a a a 8 . . . . . . 
. . . . . . . . . . . b 1 f b 8 a 8 a a a 8 a a a 8 . . . . . . 
. . . . . . . . . . . b f f b 8 a a 8 a a 8 a a 8 . . . . . . . 
. . . . . . . . . . . b f f d b 8 a 8 a a 8 a a 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 8 a 1 8 a a 8 . . . . . . . 
. . . . . . . . . . . f d d d d d b 8 a 1 8 a a 8 . . . . . . . 
. . . . . . . . . . . . f d d d d b 8 1 8 a a 8 . . . . . . . . 
. . . . . . . . . . . . . f f f f f f 8 8 a a 8 . . . . . . . . 
. . . . . . f f f f . . . . c c f f f 8 . 8 8 . . . . . . . . . 
. . . . . f f f f f f f f c f f f f f c c c c . . . . . . . . . 
. . . . . f f f f f f f c f f f f f f f f f f c . . . . . . . . 
. . . . . f f f f f f f c f f f f f f f f f f f f f . . . . . . 
. . . . . f f f f f f f c f f f f f f f f f f f f f f . . . . . 
. . . . . . f f f f f f c f f f f c f f f f f f f f f f . . . . 
. . . . . . . f f f f c . f f f f f c c f f f f f f f f . . . . 
. . . . . . . . . . . . . f f f f f f f c c f f f f f f . . . . 
. . . . . . . . . . . . . f f f f f f f f f c f f f f . . . . . 
. . . . . . . . . . . . . f f f f f f f f f . . . . . . . . . . 
. . . . . . . . . . . . . f f f f f f f f f f . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f . . . . . . . . . 
. . . . . . . . . . f f f f f f f f f f f f f f f . . . . . . . 
. . . . . . . . . f f f f f f f f f f f f f f f f f . . . . . . 
. . . . . . . . . . f f f f f f f f f f f f f f f . . . . . . . 
`)
    SoulLeftJumpAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . 8 . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . 8 8 . . . . . . . . . . . 
. . . . . . . . . . . . . 8 8 8 8 8 8 a a 8 8 . . . . . . . . . 
. . . . . . . . . . . . 8 1 1 1 a a a a a a a 8 . . . . . . . . 
. . . . . . . . . . . 8 1 f f f f a a a a a a a 8 . . . . . . . 
. . . . . . . . . . 8 1 f a a a a f f a a a a a a 8 . . . . . . 
. . . . . . . . . . 8 f 8 a a a a a f f a 1 a a a 8 . . . . . . 
. . . . . . . . . . 8 a a 8 a 1 a a a 8 f a 1 a a 8 . . . . . . 
. . . . . . . . . . 8 1 8 b 8 a 1 a a a 8 f a 1 a 8 . . . . . . 
. . . . . . . . . . . 8 8 d 8 a a a a a a 8 a 1 a 8 . . . . . . 
. . . . . . . . . . . b 1 f b 8 a 8 a a a 8 a a a 8 . . . . . . 
. . . . . . . . . . . b f f b 8 a a 8 a a 8 a a a 8 . . . . . . 
. . . . . . . . . . . b f f d b 8 a 8 a a a 8 a 8 . . . . . . . 
. . . . . . . . . . . b d d d d b 8 8 8 a a 8 a 8 . . . . . . . 
. . . . . . . . . . . f d d d d d b b 8 a 1 8 a 8 . . . . . . . 
. . . . . . . . . . . . f d d d d d b 8 1 8 a a 8 . . . . . . . 
. . . . . . . . . . . . . f f f f f f f 8 a a 8 . . . . . . . . 
. . . . . . . f f f f . . c c f f f f c 8 c 8 . . . . . . . . . 
. . . . . . f f f f f f c f f f f f f f f f c c . . . . . . . . 
. . . . . f f f f f f f c f f f f f f f f f f f f f f f . . . . 
. . . . . f f f f f f f c f f f f f f f f f f f f f f f f . . . 
. . . . . f f f f f f f c f f f f f f f f f f f f f f f f . . . 
. . . . . . f f f f f f c f f f f c f f f f f f f f f f f . . . 
. . . . . . . . f f f c . f f f f f c c f f f f f f f f f . . . 
. . . . . . . . . . . . . f f f f f f f c c f f f f f f . . . . 
. . . . . . . . . . . . . f f f f f f f f f c f f f f . . . . . 
. . . . . . . . . . . . f f f f f f f f f f f . . . . . . . . . 
. . . . . . . . . . . f f f f f f f f f f f f f . . . . . . . . 
. . . . . . . . . f f f f f f f f f f f f f f f f f . . . . . . 
. . . . . . . . . . f f f f f f f f f f f f f f f . . . . . . . 
. . . . . . . . . . . f f f f f f f f f f f f f . . . . . . . . 
`)
}
// To switch between levels you should make multiple
//
//
// different sprites that you overlap to change to a
//
//
// specific level.
function LevelNext () {
    scene.setTileMap(Levels[NextLevel])
    for (let value of scene.getTilesByType(15)) {
        value.place(HeroPlayer)
    }
    NextLevel += 1
    RemovalofSprites()
    TileTypes()
    MonsterSprites()
    TextTiles()
    game.splash("Level" + NextLevel)
}
// Slash's right face animation
function SlashRightFace () {
    SlashRightClimb = animation.createAnimation(ActionKind.SlashRightClimb, 250)
    animation.attachAnimation(HeroPlayer, SlashRightClimb)
    SlashRightClimb.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . . . . . . . . . . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . . . . . . . . . . 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . . . . 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f f f f f f f f f 2 f . . . . . . . . . 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 9 8 c f . . . . . . . . . . 
. . . . . f 2 f f b 8 9 9 9 9 9 8 9 8 1 b . . . . . . . . . . . 
. . . . . . f 8 9 b 8 9 9 9 8 9 8 8 f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 9 9 8 9 8 b f d b c . f f . . . . . . . . 
. . . . . . . 8 9 9 8 1 9 8 8 f f 2 d d c f b d f . . . . . . . 
. . . . . . 8 9 9 9 8 9 8 f f 2 2 2 2 c f c d d f . . . . . . . 
. . . . . . . 8 8 9 9 f f 2 2 2 2 2 c f c 2 2 2 f . . . . . . . 
. . . . . . . . . 8 f 2 2 2 2 2 2 c f c 2 2 2 f . . . . . . . . 
. . . . . . . . . . f 2 2 2 2 c c 2 f c 2 2 f . . . . . . . . . 
. . . . . . . . . . f 2 2 c c 2 2 2 f c c f . . . . . . . . . . 
. . . . . . . . . . f 2 2 2 2 2 2 2 f c f . . . . . . . . . . . 
. . . . . . . . . . . f 2 2 2 2 2 2 f f . . . . . . . . . . . . 
. . . . . . . . . . . f 2 2 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . . . f 1 1 1 1 1 1 f . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f . . . . . . . . . . . . 
. . . . . . . . . . . . . f 8 f 6 6 8 f . . . . . . . . . . . . 
. . . . . . . . . . . . . f f f f f f f . . . . . . . . . . . . 
. . . . . . . . . . . . . . f f . f f . . . . . . . . . . . . . 
`)
    SlashRightClimb.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . . . . . . . . . . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . . . . . . . . . . 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . . . . 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f f f f f f f f f 2 f . . . . . . . . . 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 9 8 c f . . . . . . . . . . 
. . . . . f 2 f f b 8 9 9 9 8 9 8 9 8 1 b . . . . . . . . . . . 
. . . . . . f 8 9 b 8 9 9 8 9 9 8 8 f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 9 9 8 9 8 b d f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 1 9 8 8 b d d f f b . . . . . . . . . . . 
. . . . . . 8 9 9 9 9 8 9 8 b d d f d b c . f f . . . . . . . . 
. . . . . . . 8 8 9 9 f 8 b d f f 2 d d c f d b f . . . . . . . 
. . . . . . . . . 8 8 . f f f 2 2 2 2 c f c d d f . . . . . . . 
. . . . . . . . . 8 . f f 2 2 2 2 2 c f c 2 2 f . . . . . . . . 
. . . . . . . . . . f 2 2 2 2 2 2 c f c 2 2 f . . . . . . . . . 
. . . . . . . . . . f 2 2 2 2 c c 2 f c 2 f . . . . . . . . . . 
. . . . . . . . . . f 2 2 c c 2 2 2 f f f . . . . . . . . . . . 
. . . . . . . . . . . f 2 2 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . . . f 2 2 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . . . f 1 1 1 1 1 1 f . . . . . . . . . . . . . 
. . . . . . . . . . . f 1 1 1 1 1 1 f . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f f f . . . . . . . . . . . . 
. . . . . . . . . . . . . f 8 f 6 6 8 f . . . . . . . . . . . . 
. . . . . . . . . . . . . f 8 f 6 6 8 f . . . . . . . . . . . . 
. . . . . . . . . . . . . f f f f f f f . . . . . . . . . . . . 
. . . . . . . . . . . . . . f f . f f . . . . . . . . . . . . . 
`)
    SlashRightWalk = animation.createAnimation(ActionKind.SlashRightWalk, 150)
    animation.attachAnimation(HeroPlayer, SlashRightWalk)
    SlashRightWalk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . . . . . . . . . . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . . . . . . . . . . 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . . . . 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f f f f f f f f f 2 f . . . . . . . . . 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 9 8 c f . . . . . . . . . . 
. . . . . f 2 f f b 8 9 9 9 8 9 8 9 8 1 b . . . . . . . . . . . 
. . . . . . f 8 9 b 8 9 9 8 9 9 8 8 f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 9 9 8 9 8 b d f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 1 9 8 8 b d d d d b . . . . . . . . . . . 
. . . . . . 8 9 9 9 9 8 9 8 b d d d d d f . . . . . . . . . . . 
. . . . . . . 8 8 9 9 f 8 b d d d d d f . . . . . . . . . . . . 
. . . . . . . . . 8 8 . f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . 8 . . . f f b f . . . . . . . . . . . . . . . 
. . . . . . . . . . . f f 1 1 f f f . . . . . . . . . . . . . . 
. . . . . . . . . . f 2 2 2 2 1 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 2 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 c 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 c 2 2 2 2 f f . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 c 2 2 2 2 f c f . . . . . . . . . . . 
. . . . . . . . . c d d c 1 1 1 1 1 f c f . . . . . . . . . . . 
. . . . . . . . . c d b c 1 1 1 1 1 f b f . . . . . . . . . . . 
. . . . . . . . . . c c f f f f f f f f . . . . . . . . . . . . 
. . . . . . . . . . . f 6 6 8 f 8 8 f . . . . . . . . . . . . . 
. . . . . . . . . . . f 6 6 8 f 8 8 f . . . . . . . . . . . . . 
. . . . . . . . . . . f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . . . . f f . . f f . . . . . . . . . . . . . . 
`)
    SlashRightWalk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . . . . . . . . . . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . . . . . . . . . . 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . . . . 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f f f f f f f f f 2 f . . . . . . . . . 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 9 8 c f . . . . . . . . . . 
. . . . . f 2 f f b 8 9 9 9 9 9 8 9 8 1 b . . . . . . . . . . . 
. . . . . . f 8 9 b 8 9 9 9 8 9 8 8 f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 9 9 8 9 8 b d f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 1 9 8 8 b d d d d b . . . . . . . . . . . 
. . . . . . 8 9 9 9 8 9 8 b b d d d d d f . . . . . . . . . . . 
. . . . . . . 8 8 9 9 8 b d d d d d d f . . . . . . . . . . . . 
. . . . . . . . . 8 8 f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . 8 f 2 2 1 1 f f f . . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 2 2 1 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 2 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 c 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 c 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . . f 2 2 2 c 2 2 2 f f . . . . . . . . . . . . 
. . . . . . . . . . f 2 d d c 1 1 1 f f . . . . . . . . . . . . 
. . . . . . . . . . . c d b c 1 1 1 f f . . . . . . . . . . . . 
. . . . . . . . . . . . c c f f f f . . . . . . . . . . . . . . 
. . . . . . . . . . . . f 6 6 8 f f . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f . . . . . . . . . . . . . . 
. . . . . . . . . . . . . f f f f . . . . . . . . . . . . . . . 
`)
    SlashRightWalk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . . . . . . . . . . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . . . . . . . . . . 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . . . . 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f f f f f f f f f 2 f . . . . . . . . . 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 9 8 c f . . . . . . . . . . 
. . . . . f 2 f f b 8 9 9 9 8 9 8 9 8 1 b . . . . . . . . . . . 
. . . . . . f 8 9 b 8 9 9 8 9 9 8 8 f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 9 9 8 9 8 b d f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 1 9 8 8 b d d d d b . . . . . . . . . . . 
. . . . . . 8 9 9 9 9 8 9 8 b d d d d d f . . . . . . . . . . . 
. . . . . . . 8 8 9 9 f 8 b d d d d d f . . . . . . . . . . . . 
. . . . . . . . . 8 8 . f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . 8 . . . f f b f . . . . . . . . . . . . . . . 
. . . . . . . . . . . f f 1 1 f f f . . . . . . . . . . . . . . 
. . . . . . . . . . f 2 2 2 2 1 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . . f 2 2 2 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . . f 2 2 c 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . . f 2 2 2 c 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . . c 2 2 2 2 c 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . . . c 2 2 d d c 1 f . . . . . . . . . . . . . 
. . . . . . . . . . . f c 2 d b c 1 f . . . . . . . . . . . . . 
. . . . . . . . . . . f f f c c f f f . . . . . . . . . . . . . 
. . . . . . . . . . . . f f 6 6 8 f . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f 6 6 8 f . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f . . . . . . . . . . . . . . 
. . . . . . . . . . . . . f f f f . . . . . . . . . . . . . . . 
`)
    SlashRightWalk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . . . . . . . . . . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . . . . . . . . . . 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . . . . 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f f f f f f f f f 2 f . . . . . . . . . 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 9 8 c f . . . . . . . . . . 
. . . . . f 2 f f b 8 9 9 9 9 9 8 9 8 1 b . . . . . . . . . . . 
. . . . . . f 8 9 b 8 9 9 9 8 9 8 8 f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 9 9 8 9 8 b d f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 1 9 8 8 b d d d d b . . . . . . . . . . . 
. . . . . . 8 9 9 9 8 9 8 b b d d d d d f . . . . . . . . . . . 
. . . . . . . 8 8 9 9 8 b d d d d d d f . . . . . . . . . . . . 
. . . . . . . . . 8 8 f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . 8 f 2 2 1 1 f f f . . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 2 2 1 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 2 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 c 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 c 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . . f 2 2 2 c 2 2 2 f f . . . . . . . . . . . . 
. . . . . . . . . . f 2 d d c 1 1 1 f f . . . . . . . . . . . . 
. . . . . . . . . . . c d b c 1 1 1 f f . . . . . . . . . . . . 
. . . . . . . . . . . f c c f f f f f . . . . . . . . . . . . . 
. . . . . . . . . . . f 8 8 f 6 6 8 f . . . . . . . . . . . . . 
. . . . . . . . . . . f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . . . . f f . . f f . . . . . . . . . . . . . . 
`)
    SlashRightWalk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . . . . . . . . . . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . . . . . . . . . . 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . . . . 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f f f f f f f f f 2 f . . . . . . . . . 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 9 8 c f . . . . . . . . . . 
. . . . . f 2 f f b 8 9 9 9 8 9 8 9 8 1 b . . . . . . . . . . . 
. . . . . . f 8 9 b 8 9 9 8 9 9 8 8 f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 9 9 8 9 8 b d f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 1 9 8 8 b d d d d b . . . . . . . . . . . 
. . . . . . 8 9 9 9 9 8 9 8 b d d d d d f . . . . . . . . . . . 
. . . . . . . 8 8 9 9 f 8 b d d d d d f . . . . . . . . . . . . 
. . . . . . . . . 8 8 . f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . 8 . . . f f b f . . . . . . . . . . . . . . . 
. . . . . . . . . . . f f 1 1 f f f . . . . . . . . . . . . . . 
. . . . . . . . . . f 2 2 2 2 1 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 2 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 c 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 c 2 2 2 2 f f . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 c 2 2 2 2 f c f . . . . . . . . . . . 
. . . . . . . . . c d d c 1 1 1 1 1 f c f . . . . . . . . . . . 
. . . . . . . . . c d b c 1 1 1 1 1 f b f . . . . . . . . . . . 
. . . . . . . . . . c c f f f f f f f f . . . . . . . . . . . . 
. . . . . . . . . . . . f f 6 6 8 f . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f 6 6 8 f . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f . . . . . . . . . . . . . . 
. . . . . . . . . . . . . f f f f . . . . . . . . . . . . . . . 
`)
    SlashRightWalk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . . . . . . . . . . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . . . . . . . . . . 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . . . . 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f f f f f f f f f 2 f . . . . . . . . . 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 9 8 c f . . . . . . . . . . 
. . . . . f 2 f f b 8 9 9 9 9 9 8 9 8 1 b . . . . . . . . . . . 
. . . . . . f 8 9 b 8 9 9 9 8 9 8 8 f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 9 9 8 9 8 b d f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 1 9 8 8 b d d d d b . . . . . . . . . . . 
. . . . . . 8 9 9 9 8 9 8 b b d d d d d f . . . . . . . . . . . 
. . . . . . . 8 8 9 9 8 b d d d d d d f . . . . . . . . . . . . 
. . . . . . . . . 8 8 f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . 8 f 2 2 1 1 f f f . . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 2 2 1 2 2 f . . . . . . . . . . . . . 
. . . . . . . . f 2 2 2 2 2 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . f 2 2 2 2 c 2 2 2 2 2 f f . . . . . . . . . . . . 
. . . . . . f 2 2 2 2 c 2 2 2 2 2 2 f c f . . . . . . . . . . . 
. . . . . . c d d 2 c 2 2 2 2 2 2 2 f c 2 f . . . . . . . . . . 
. . . . . . c b d c f 1 1 1 1 1 1 1 f c b f . . . . . . . . . . 
. . . . . . . c c . f 1 1 1 1 1 1 1 f b d f . . . . . . . . . . 
. . . . . . . . . . . f f f f f f f f f f . . . . . . . . . . . 
. . . . . . . . . . . . f 6 6 8 f f . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f . . . . . . . . . . . . . . 
. . . . . . . . . . . . . f f f f . . . . . . . . . . . . . . . 
`)
    SlashRightIdle = animation.createAnimation(ActionKind.SlashRightIdle, 250)
    animation.attachAnimation(HeroPlayer, SlashRightIdle)
    SlashRightIdle.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . . . . . . . . . . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . . . . . . . . . . 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . . . . 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f f f f f f f f f 2 f . . . . . . . . . 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 9 8 c f . . . . . . . . . . 
. . . . . f 2 f f b 8 9 9 9 8 9 8 9 8 1 b . . . . . . . . . . . 
. . . . . . f 8 9 b 8 9 9 8 9 9 8 8 f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 9 9 8 9 8 b d f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 1 9 8 8 b d d d d b . . . . . . . . . . . 
. . . . . . 8 9 9 9 9 8 9 8 b d d d d d f . . . . . . . . . . . 
. . . . . . . 8 8 9 9 f 8 b d d d d d f . . . . . . . . . . . . 
. . . . . . . . . 8 8 . f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . 8 . . . f f b f . . . . . . . . . . . . . . . 
. . . . . . . . . . . f f 1 1 f f f . . . . . . . . . . . . . . 
. . . . . . . . . . f 2 2 2 2 1 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 2 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 c 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 c 2 2 2 2 f f . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 c 2 2 2 2 f c f . . . . . . . . . . . 
. . . . . . . . . c d d c 1 1 1 1 1 f c f . . . . . . . . . . . 
. . . . . . . . . c d b c 1 1 1 1 1 f b f . . . . . . . . . . . 
. . . . . . . . . . c c f f f f f f f f . . . . . . . . . . . . 
. . . . . . . . . . . f 6 6 8 f 8 8 f . . . . . . . . . . . . . 
. . . . . . . . . . . f 6 6 8 f 8 8 f . . . . . . . . . . . . . 
. . . . . . . . . . . f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . . . . f f . . f f . . . . . . . . . . . . . . 
`)
    SlashRightIdle.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . . . . . . . . . . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . . . . . . . . . . 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . . . . 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f f f f f f f f f 2 f . . . . . . . . . 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 9 8 c f . . . . . . . . . . 
. . . . . f 2 f f b 8 9 9 9 9 9 8 9 8 1 b . . . . . . . . . . . 
. . . . . . f 8 9 b 8 9 9 9 8 9 8 8 f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 9 9 8 9 8 b d f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 1 9 8 8 b d d d d b . . . . . . . . . . . 
. . . . . . 8 9 9 9 8 9 8 b b d d d d d f . . . . . . . . . . . 
. . . . . . . 8 8 9 9 8 b d d d d d d f . . . . . . . . . . . . 
. . . . . . . . . 8 8 f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . 8 f 2 2 1 1 f f f . . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 2 2 1 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 2 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 c 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 c 2 2 2 2 f f . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 c 2 2 2 2 f c f . . . . . . . . . . . 
. . . . . . . . . c d d c 1 1 1 1 1 f c f . . . . . . . . . . . 
. . . . . . . . . c d b c 1 1 1 1 1 f b f . . . . . . . . . . . 
. . . . . . . . . . c c f f f f f f f f . . . . . . . . . . . . 
. . . . . . . . . . . f 6 6 8 f 8 8 f . . . . . . . . . . . . . 
. . . . . . . . . . . f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . . . . f f . . f f . . . . . . . . . . . . . . 
`)
    SlashRightWalkAtk = animation.createAnimation(ActionKind.SlashRightWalkAtk, 120)
    animation.attachAnimation(HeroPlayer, SlashRightWalkAtk)
    SlashRightWalkAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . . . . . . . . . . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . . . . . . . . . . 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . . . . 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f f f f f f f f f 2 f . . . . . . . . . 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 9 8 c f . . . . . . . . . . 
. . . . . f 2 f f b 8 9 9 9 9 9 8 9 8 1 b . . . . . . . . . . . 
. . . . . . f 8 9 b 8 9 9 9 8 9 8 8 f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 9 9 8 9 8 b d f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 1 9 8 8 b d d d d b . . . . . . . . . . . 
. . . . . . 8 9 9 9 8 9 8 b b d d d d d f . . . . . . . . . . . 
. . . . . . . 8 8 9 9 8 b d d d d d d f . . . . . . . . . . . . 
. . . . . . . . . 8 8 f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . 8 f 2 2 1 1 f f f . . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 2 2 1 2 2 f f . . . . . . . . . . . . 
. . . . . . . . f 2 2 2 c 2 2 2 2 2 f c c c . . . . . . . . . . 
. . . . . . . f 2 2 2 c 2 2 2 2 2 2 f c d d c . . . . . . . . . 
. . . . . . f 2 2 2 c 2 2 2 2 2 2 2 f f b d c . . . . . . . . . 
. . . . . . c d d c f 2 2 2 2 2 2 2 f . c c . . . . . . . . . . 
. . . . . . f f d c f 1 1 1 1 1 1 1 f . . . . . . . . . . . . . 
. . . . . f e f c . . f f f f f f f f . . . . . . . . . . . . . 
. . . . f 1 f . . . . f 6 6 8 f 8 8 f . . . . . . . . . . . . . 
. . . f 1 f . . . . . f 6 6 8 f 8 8 f . . . . . . . . . . . . . 
. . f 1 f . . . . . . f f f f f f f f . . . . . . . . . . . . . 
. . f f . . . . . . . . f f . . f f . . . . . . . . . . . . . . 
`)
    SlashRightWalkAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . . . . . . . . . . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . . . . . . . . . . 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . . . . 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f f f f f f f f f 2 f . . . . . . . . . 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 8 c c f . . . . . . . . . . 
. . . . . f 2 f f b 8 9 9 9 9 9 8 9 8 1 b . . . . . . . . . . . 
. . . . . . f 8 9 b 8 9 9 9 9 9 8 8 f f b . . . . . . . . . . . 
. . . . . . . 8 9 8 9 9 9 8 9 8 b d f f b . . . . . . . . . . . 
. . . . . . 8 9 8 9 9 1 8 9 8 b d d d d b . . . . . . . . . . . 
. . . . . . . 8 9 8 8 8 8 8 b d d d d d f . . . . . . . . . . . 
. . . . . . . . 8 9 9 8 f f f d d d d f . . . . . . . . . . . . 
. . . . . . . . . f f 2 2 1 1 f f f f . . . . . . . . . . . . . 
. . . . . . . c f 2 2 2 2 2 2 1 2 2 f f . . . . . . . . . . . . 
. . . . . . c d 2 2 2 c 2 2 2 2 2 2 f c c . . . . . . . . . . . 
. . . . . f f d 2 c c 2 2 2 2 2 2 2 c d d c . . . . . . . . . . 
. . . . f e f c c . f 2 2 2 2 2 2 2 f b d c . . . . . . . . . . 
. . . f 1 f c . . . f 1 1 1 1 1 1 1 f c c . . . . . . . . . . . 
. . f 1 f . . . . . . f f f f f f f f . . . . . . . . . . . . . 
. f 1 f . . . . . . . . f 6 6 8 f f . . . . . . . . . . . . . . 
. f f . . . . . . . . . f f f f f f . . . . . . . . . . . . . . 
. . . . . . . . . . . . . f f f f . . . . . . . . . . . . . . . 
`)
    SlashRightWalkAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . . . . . . . . . . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . . . . . . . . . . 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . . . . 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 3 f f . . . . . . . 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 3 f 1 f . . . . . . . 
. . . . . f 2 f 3 2 2 f f f f f f f f f f 2 f 1 f . . . . . . . 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 9 8 c f 1 f . . . . . . . . 
. . . . . f 2 f f b 8 9 9 9 9 9 8 9 8 1 f 1 f . . . . . . . . . 
. . . . . . f 8 9 b 8 9 9 9 8 9 8 8 c f e f . . . . . . . . . . 
. . . . . . . 8 9 9 8 9 9 8 9 8 b f d f f . . . . . . . . . . . 
. . . . . . 8 9 9 9 8 1 9 8 8 f f 2 d d c . . . . . . . . . . . 
. . . . . . . 8 9 9 8 9 8 f f 2 2 2 2 c . . . . . . . . . . . . 
. . . . . . . . 8 9 9 f f 2 2 2 2 2 c f . . . . . . . . . . . . 
. . . . . . . . . 8 f 2 2 2 2 2 2 c f c c . . . . . . . . . . . 
. . . . . . . . 8 . f 2 2 2 2 c c 2 c b d c . . . . . . . . . . 
. . . . . . . . . . f 2 2 c c 2 2 2 f d d c . . . . . . . . . . 
. . . . . . . . . . f 2 2 2 2 2 2 2 f c c . . . . . . . . . . . 
. . . . . . . . . . f 2 2 2 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . . f 2 2 2 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . . f 1 1 1 1 1 1 1 f . . . . . . . . . . . . . 
. . . . . . . . . . . f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . . . . f f 6 6 8 f . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f . . . . . . . . . . . . . . 
. . . . . . . . . . . . . f f f f . . . . . . . . . . . . . . . 
`)
    SlashRightWalkAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . 1 1 1 1 1 1 1 1 1 1 . . . 
. . . . . . . . . . . . . . . . . . . . . 1 1 1 1 1 1 1 1 1 . . 
. . . . . . . . f f f f f f f f f f f f . . 1 1 1 1 1 1 1 1 1 . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . 1 1 1 1 1 1 1 1 . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . 1 1 1 1 1 1 1 1 1 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . 1 1 1 1 1 1 1 1 1 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f 1 1 1 1 1 1 1 1 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 f 1 f 1 1 1 1 1 1 1 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 f 1 f 1 1 1 1 1 1 1 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 f 1 f 1 1 1 1 1 1 1 1 
. . . . . f 2 f 3 2 2 f f f f f f f f f f f 1 f 1 1 1 1 1 1 1 1 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 9 8 f 1 f 1 1 1 1 1 1 1 1 1 
. . . . . f 2 f f b 8 9 9 9 9 9 8 9 c f b f 1 1 1 1 1 1 1 1 1 1 
. . . . . . f 8 9 b 8 9 9 9 9 9 8 f d f f . 1 1 1 1 1 1 1 1 1 1 
. . . . . . . 8 9 8 9 9 9 8 9 8 f 2 d d c . . 1 1 1 1 1 1 1 1 1 
. . . . . . . 8 8 9 9 1 8 9 8 f 2 2 2 c b . . 1 1 1 1 1 1 1 1 1 
. . . . . . 8 9 9 8 8 8 8 8 f 2 2 2 2 c f . . 1 1 1 1 1 1 1 1 1 
. . . . . . . 8 8 9 9 8 8 f 2 2 2 2 c f . . 1 1 1 1 1 1 1 1 1 1 
. . . . . . . . . 8 8 . f 2 2 2 2 2 c . 1 1 1 1 1 1 1 1 1 1 1 1 
. . . . . . . . . 8 . f 2 2 2 2 2 c f 1 1 1 1 1 1 1 1 1 1 1 1 1 
. . . . . . . . . . f 2 2 2 2 2 c 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
. . . . . . . . . . f 2 2 2 2 c 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
. . . . . . . . . . f 2 2 c c 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
. . . . . . . . . . f 2 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . 
. . . . . . . . . . f 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . 
. . . . . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . 
. . . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . 
. . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . . . 
. . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . . . . . 
. . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . . . . . . . 
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . . . . . . . . . 
. . . . 1 1 1 1 1 1 1 1 1 1 1 1 f f . . . . . . . . . . . . . . 
`)
    SlashRightWalkAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . . . . . . . . . . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . . . . . . . . . . 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . . . . 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f 1 1 . . . . . . 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 3 3 f 1 1 . . . . . 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 3 f f 1 1 1 . . . . 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 3 f 1 f 1 1 1 . . . . 
. . . . . f 2 f 3 2 2 f f f f f f f f f f 2 f 1 f 1 1 1 1 . . . 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 9 8 c f 1 f 1 1 1 1 1 . . . 
. . . . . f 2 f f b 8 9 9 9 9 9 8 9 8 1 f 1 f 1 1 1 1 1 1 . . . 
. . . . . . f 8 9 b 8 9 9 9 8 9 8 8 c f e f 1 1 1 1 1 1 1 . . . 
. . . . . . . 8 9 9 8 9 9 8 9 8 b f d f f . 1 1 1 1 1 1 1 . . . 
. . . . . . 8 9 9 9 8 1 9 8 8 f f 2 d d c 1 1 1 1 1 1 1 1 . . . 
. . . . . . . 8 9 9 8 9 8 f f 2 2 2 2 c . 1 1 1 1 1 1 1 1 . . . 
. . . . . . . . 8 9 8 f f 2 2 2 2 2 c f . 1 1 1 1 1 1 1 . . . . 
. . . . . . . . . 8 f 2 2 2 2 2 2 c f c c 1 1 1 1 1 1 1 . . . . 
. . . . . . . . 8 . f 2 2 2 2 c c 2 c b 1 1 1 1 1 1 1 . . . . . 
. . . . . . . . . . f 2 2 c c 2 2 2 f d 1 1 1 1 1 1 . . . . . . 
. . . . . . . . . . f 2 2 2 2 2 2 2 f c 1 1 1 1 1 1 . . . . . . 
. . . . . . . . . . f 2 2 2 2 2 2 2 f 1 1 1 1 1 1 . . . . . . . 
. . . . . . . . . . f 1 1 1 1 1 1 1 f 1 1 1 1 . . . . . . . . . 
. . . . . . . . . . . f f f f f f f 1 1 . . . . . . . . . . . . 
. . . . . . . . . . . . f f 6 6 8 f . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f 6 6 8 f . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f . . . . . . . . . . . . . . 
. . . . . . . . . . . . . f f f f . . . . . . . . . . . . . . . 
`)
    SlashRightWalkAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . . . . . . . . . . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . . . . . . . . . . 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . . . . 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 3 f f . . . . . . . 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 3 f 1 f . . . . . . . 
. . . . . f 2 f 3 2 2 f f f f f f f f f f 2 f 1 f . . . . . . . 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 9 8 c f 1 f . . . . . . . . 
. . . . . f 2 f f b 8 9 9 9 8 9 8 9 8 1 f 1 f . . . . . . . . . 
. . . . . . f 8 9 b 8 9 9 8 9 9 8 8 c f e f . . . . . . . . . . 
. . . . . . . 8 9 9 8 9 9 8 9 8 b f d f f . . . . . . . . . . . 
. . . . . . 8 8 9 9 8 1 9 8 8 f f 2 d d c . . . . . . . . . . . 
. . . . . . . 8 9 9 9 8 9 f f 2 2 2 2 c . . . . . . . . . . . . 
. . . . . . . . 8 9 9 f f 2 2 2 2 2 c f . . . . . . . . . . . . 
. . . . . . . . . 8 f 2 2 2 2 2 2 c f c c . . . . . . . . . . . 
. . . . . . . . 8 . f 2 2 2 2 c c 2 c b d c . . . . . . . . . . 
. . . . . . . . . . f 2 2 c c 2 2 2 f d d c . . . . . . . . . . 
. . . . . . . . . . f 2 2 2 2 2 2 2 f c c . . . . . . . . . . . 
. . . . . . . . . . f 2 2 2 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . . f 2 2 2 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . . f 1 1 1 1 1 1 1 f . . . . . . . . . . . . . 
. . . . . . . . . . . f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . . . . f 6 6 8 f f . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f . . . . . . . . . . . . . . 
. . . . . . . . . . . . . f f f f . . . . . . . . . . . . . . . 
`)
    SlashRightIdleAtk = animation.createAnimation(ActionKind.SlashRightIdleAtk, 120)
    animation.attachAnimation(HeroPlayer, SlashRightIdleAtk)
    SlashRightIdleAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . . . . . . . . . . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . . . . . . . . . . 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . . . . 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f f f f f f f f f 2 f . . . . . . . . . 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 9 8 c f . . . . . . . . . . 
. . . . . f 2 f f b 8 9 9 9 9 9 8 9 8 1 b . . . . . . . . . . . 
. . . . . . f 8 9 b 8 9 9 9 8 9 8 8 f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 9 9 8 9 8 b d f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 1 9 8 8 b d d d d b . . . . . . . . . . . 
. . . . . . 8 9 9 9 8 9 8 b b d d d d d f . . . . . . . . . . . 
. . . . . . . 8 8 9 9 8 b d d d d d d f . . . . . . . . . . . . 
. . . . . . . . . 8 8 f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . 8 f 2 2 1 1 f f f . . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 2 2 1 2 2 f f . . . . . . . . . . . . 
. . . . . . . . f 2 2 2 c 2 2 2 2 2 f c c c . . . . . . . . . . 
. . . . . . . f 2 2 2 c 2 2 2 2 2 2 f c d d c . . . . . . . . . 
. . . . . . f 2 2 2 c 2 2 2 2 2 2 2 f f b d c . . . . . . . . . 
. . . . . . c d d c f 2 2 2 2 2 2 2 f . c c . . . . . . . . . . 
. . . . . . f f d c f 1 1 1 1 1 1 1 f . . . . . . . . . . . . . 
. . . . . f e f c . . f f f f f f f f . . . . . . . . . . . . . 
. . . . f 1 f . . . . f 8 8 f 6 6 8 f . . . . . . . . . . . . . 
. . . f 1 f . . . . . f 8 8 f 6 6 8 f . . . . . . . . . . . . . 
. . f 1 f . . . . . . f f f f f f f f . . . . . . . . . . . . . 
. . f f . . . . . . . . f f . . f f . . . . . . . . . . . . . . 
`)
    SlashRightIdleAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . . . . . . . . . . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . . . . . . . . . . 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . . . . 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f f f f f f f f f 2 f . . . . . . . . . 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 8 c c f . . . . . . . . . . 
. . . . . f 2 f f b 8 9 9 9 9 9 8 9 8 1 b . . . . . . . . . . . 
. . . . . . f 8 9 b 8 9 9 9 9 9 8 8 f f b . . . . . . . . . . . 
. . . . . . . 8 9 8 9 9 9 8 9 8 b d f f b . . . . . . . . . . . 
. . . . . . 8 9 8 9 9 1 8 9 8 b d d d d b . . . . . . . . . . . 
. . . . . . . 8 9 8 8 8 8 8 b d d d d d f . . . . . . . . . . . 
. . . . . . . . 8 9 9 8 f f f d d d d f . . . . . . . . . . . . 
. . . . . . . . . f f 2 2 1 1 f f f f . . . . . . . . . . . . . 
. . . . . . . c f 2 2 2 2 2 2 1 2 2 f f . . . . . . . . . . . . 
. . . . . . c d 2 2 2 c 2 2 2 2 2 2 f c c . . . . . . . . . . . 
. . . . . f f d 2 c c 2 2 2 2 2 2 2 c d d c . . . . . . . . . . 
. . . . f e f c c . f 2 2 2 2 2 2 2 f b d c . . . . . . . . . . 
. . . f 1 f c . . . f 1 1 1 1 1 1 1 f c c . . . . . . . . . . . 
. . f 1 f . . . . . . f f f f f f f f . . . . . . . . . . . . . 
. f 1 f . . . . . . . f 8 8 f 6 6 8 f . . . . . . . . . . . . . 
. f f . . . . . . . . f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . . . . f f . . f f . . . . . . . . . . . . . . 
`)
    SlashRightIdleAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . . . . . . . . . . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . . . . . . . . . . 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . . . . 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 3 f f . . . . . . . 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 3 f 1 f . . . . . . . 
. . . . . f 2 f 3 2 2 f f f f f f f f f f 2 f 1 f . . . . . . . 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 9 8 c f 1 f . . . . . . . . 
. . . . . f 2 f f b 8 9 9 9 9 9 8 9 8 1 f 1 f . . . . . . . . . 
. . . . . . f 8 9 b 8 9 9 9 8 9 8 8 c f e f . . . . . . . . . . 
. . . . . . . 8 9 9 8 9 9 8 9 8 b f d f f . . . . . . . . . . . 
. . . . . . 8 9 9 9 8 1 9 8 8 f f 2 d d c . . . . . . . . . . . 
. . . . . . . 8 9 9 8 9 8 f f 2 2 2 2 c . . . . . . . . . . . . 
. . . . . . . . 8 9 9 f f 2 2 2 2 2 c f . . . . . . . . . . . . 
. . . . . . . . . 8 f 2 2 2 2 2 2 c f c c . . . . . . . . . . . 
. . . . . . . . 8 . f 2 2 2 2 c c 2 c b d c . . . . . . . . . . 
. . . . . . . . . . f 2 2 c c 2 2 2 f d d c . . . . . . . . . . 
. . . . . . . . . . f 2 2 2 2 2 2 2 f c c . . . . . . . . . . . 
. . . . . . . . . . f 2 2 2 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . . f 2 2 2 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . . f 1 1 1 1 1 1 1 f . . . . . . . . . . . . . 
. . . . . . . . . . . f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . . . f 8 8 f 6 6 8 f . . . . . . . . . . . . . 
. . . . . . . . . . . f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . . . . f f . . f f . . . . . . . . . . . . . . 
`)
    SlashRightIdleAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . 1 1 1 1 1 1 1 1 1 1 . . . 
. . . . . . . . . . . . . . . . . . . . . 1 1 1 1 1 1 1 1 1 . . 
. . . . . . . . f f f f f f f f f f f f . . 1 1 1 1 1 1 1 1 1 . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . 1 1 1 1 1 1 1 1 . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . 1 1 1 1 1 1 1 1 1 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . 1 1 1 1 1 1 1 1 1 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f 1 1 1 1 1 1 1 1 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 f 1 f 1 1 1 1 1 1 1 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 f 1 f 1 1 1 1 1 1 1 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 f 1 f 1 1 1 1 1 1 1 1 
. . . . . f 2 f 3 2 2 f f f f f f f f f f f 1 f 1 1 1 1 1 1 1 1 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 9 8 f 1 f 1 1 1 1 1 1 1 1 1 
. . . . . f 2 f f b 8 9 9 9 9 9 8 9 c f b f 1 1 1 1 1 1 1 1 1 1 
. . . . . . f 8 9 b 8 9 9 9 9 9 8 f d f f . 1 1 1 1 1 1 1 1 1 1 
. . . . . . . 8 9 8 9 9 9 8 9 8 f 2 d d c . . 1 1 1 1 1 1 1 1 1 
. . . . . . . 8 8 9 9 1 8 9 8 f 2 2 2 c b . . 1 1 1 1 1 1 1 1 1 
. . . . . . 8 9 9 8 8 8 8 8 f 2 2 2 2 c f . . 1 1 1 1 1 1 1 1 1 
. . . . . . . 8 8 9 9 8 8 f 2 2 2 2 c f . . 1 1 1 1 1 1 1 1 1 1 
. . . . . . . . . 8 8 . f 2 2 2 2 2 c . 1 1 1 1 1 1 1 1 1 1 1 1 
. . . . . . . . . 8 . f 2 2 2 2 2 c f 1 1 1 1 1 1 1 1 1 1 1 1 1 
. . . . . . . . . . f 2 2 2 2 2 c 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
. . . . . . . . . . f 2 2 2 2 c 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
. . . . . . . . . . f 2 2 c c 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
. . . . . . . . . . f 2 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . 
. . . . . . . . . . f 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . 
. . . . . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . 
. . . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . 
. . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . . . 
. . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . . . . . 
. . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . . . . . . . 
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . . . . . . . . . 
. . . . 1 1 1 1 1 1 1 1 1 1 1 1 f f . . . . . . . . . . . . . . 
`)
    SlashRightIdleAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . . . . . . . . . . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . . . . . . . . . . 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . . . . 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f 1 1 . . . . . . 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 3 3 f 1 1 . . . . . 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 3 f f 1 1 1 . . . . 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 3 f 1 f 1 1 1 . . . . 
. . . . . f 2 f 3 2 2 f f f f f f f f f f 2 f 1 f 1 1 1 1 . . . 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 9 8 c f 1 f 1 1 1 1 1 . . . 
. . . . . f 2 f f b 8 9 9 9 9 9 8 9 8 1 f 1 f 1 1 1 1 1 1 . . . 
. . . . . . f 8 9 b 8 9 9 9 8 9 8 8 c f e f 1 1 1 1 1 1 1 . . . 
. . . . . . . 8 9 9 8 9 9 8 9 8 b f d f f . 1 1 1 1 1 1 1 . . . 
. . . . . . 8 9 9 9 8 1 9 8 8 f f 2 d d c 1 1 1 1 1 1 1 1 . . . 
. . . . . . . 8 9 9 8 9 8 f f 2 2 2 2 c . 1 1 1 1 1 1 1 1 . . . 
. . . . . . . . 8 9 8 f f 2 2 2 2 2 c f . 1 1 1 1 1 1 1 . . . . 
. . . . . . . . . 8 f 2 2 2 2 2 2 c f c c 1 1 1 1 1 1 1 . . . . 
. . . . . . . . 8 . f 2 2 2 2 c c 2 c b 1 1 1 1 1 1 1 . . . . . 
. . . . . . . . . . f 2 2 c c 2 2 2 f d 1 1 1 1 1 1 . . . . . . 
. . . . . . . . . . f 2 2 2 2 2 2 2 f c 1 1 1 1 1 1 . . . . . . 
. . . . . . . . . . f 2 2 2 2 2 2 2 f 1 1 1 1 1 1 . . . . . . . 
. . . . . . . . . . f 1 1 1 1 1 1 1 f 1 1 1 1 . . . . . . . . . 
. . . . . . . . . . . f f f f f f f 1 1 . . . . . . . . . . . . 
. . . . . . . . . . . f 8 8 f 6 6 8 f . . . . . . . . . . . . . 
. . . . . . . . . . . f 8 8 f 6 6 8 f . . . . . . . . . . . . . 
. . . . . . . . . . . f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . . . . f f . . f f . . . . . . . . . . . . . . 
`)
    SlashRightIdleAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . . . . . . . . . . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . . . . . . . . . . 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . . . . 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 3 f f . . . . . . . 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 3 f 1 f . . . . . . . 
. . . . . f 2 f 3 2 2 f f f f f f f f f f 2 f 1 f . . . . . . . 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 9 8 c f 1 f . . . . . . . . 
. . . . . f 2 f f b 8 9 9 9 8 9 8 9 8 1 f 1 f . . . . . . . . . 
. . . . . . f 8 9 b 8 9 9 8 9 9 8 8 c f e f . . . . . . . . . . 
. . . . . . . 8 9 9 8 9 9 8 9 8 b f d f f . . . . . . . . . . . 
. . . . . . 8 8 9 9 8 1 9 8 8 f f 2 d d c . . . . . . . . . . . 
. . . . . . . 8 9 9 9 8 9 f f 2 2 2 2 c . . . . . . . . . . . . 
. . . . . . . . 8 9 9 f f 2 2 2 2 2 c f . . . . . . . . . . . . 
. . . . . . . . . 8 f 2 2 2 2 2 2 c f c c . . . . . . . . . . . 
. . . . . . . . 8 . f 2 2 2 2 c c 2 c b d c . . . . . . . . . . 
. . . . . . . . . . f 2 2 c c 2 2 2 f d d c . . . . . . . . . . 
. . . . . . . . . . f 2 2 2 2 2 2 2 f c c . . . . . . . . . . . 
. . . . . . . . . . f 2 2 2 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . . f 2 2 2 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . . f 1 1 1 1 1 1 1 f . . . . . . . . . . . . . 
. . . . . . . . . . . f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . . . f 8 8 f 6 6 8 f . . . . . . . . . . . . . 
. . . . . . . . . . . f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . . . . f f . . f f . . . . . . . . . . . . . . 
`)
    SlashRightJump = animation.createAnimation(ActionKind.SlashRightJump, 120)
    animation.attachAnimation(HeroPlayer, SlashRightJump)
    SlashRightJump.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . . . . . . . . . . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . . . . . . . . . . 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . . . . 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f f f f f f f f f 2 f . . . . . . . . . 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 9 8 c f . . . . . . . . . . 
. . . . . f 2 f f b 8 9 9 9 9 9 8 9 8 1 b . . . . . . . . . . . 
. . . . . . f 8 9 b 8 9 9 9 8 9 8 8 f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 9 9 8 9 8 b d f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 1 9 8 8 b d d d d b . . . . . . . . . . . 
. . . . . . 8 9 9 9 8 9 8 b b d d d d d f . . . . . . . . . . . 
. . . . . . . 8 8 9 9 8 f f f d d d d f . . . . . . . . . . . . 
. . . . . . . . . 8 f 2 2 1 1 f f f f . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 2 2 1 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 c 2 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 c c 2 2 2 2 f f f . . . . . . . . . . . 
. . . . . . . . . f 2 2 d d c 2 2 2 f c d f . . . . . . . . . . 
. . . . . . . . . f 2 2 d b c 2 2 2 f c b f . . . . . . . . . . 
. . . . . . . . . . c c c c 1 1 1 1 f f f . . . . . . . . . . . 
. . . . . . . . . . . f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . . . f 6 6 8 f 8 8 f . . . . . . . . . . . . . 
. . . . . . . . . . . f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . . . . f f . . f f . . . . . . . . . . . . . . 
`)
    SlashRightJump.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . . . . . . . . . . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . . . . . . . . . . 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . . . . 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f f f f f f f f f 2 f . . . . . . . . . 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 9 8 c f . . . . . . . . . . 
. . . . . f 2 f f b 8 9 9 9 9 9 8 9 8 1 b . . . . . . . . . . . 
. . . . . . f 8 9 b 8 9 9 9 8 9 8 8 f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 9 9 8 9 8 b d f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 1 9 8 8 b d d d d b . . . . . . . . . . . 
. . . . . . 8 9 9 9 8 9 8 b b d d d d d f . . . . . . . . . . . 
. . . . . . . 8 8 9 9 8 b d d d d d d f . . . . . . . . . . . . 
. . . . . . . . . 8 8 f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . 8 f 2 2 1 1 f f f . . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 2 2 1 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 2 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 c 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 c 2 2 2 2 f f . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 c 2 2 2 2 f c f . . . . . . . . . . . 
. . . . . . . . . c d d c 1 1 1 1 1 f c f . . . . . . . . . . . 
. . . . . . . . . c d b c f f f f f f b f . . . . . . . . . . . 
. . . . . . . . . . c c 6 6 8 f 8 8 f f . . . . . . . . . . . . 
. . . . . . . . . . . f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . . . . f f . . f f . . . . . . . . . . . . . . 
`)
    SlashRightJump.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . . . . . . . . . . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . . . . . . . . . . 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . . . . 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f f f f f f f f f 2 f . . . . . . . . . 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 9 8 c f . . . . . . . . . . 
. . . . . f 2 f f b 8 9 9 9 9 9 8 9 8 1 b . . . . . . . . . . . 
. . . . . . f 8 9 b 8 9 9 9 8 9 8 8 f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 9 9 8 9 8 b d f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 1 9 8 8 b d d d d b . . . . . . . . . . . 
. . . . . . 8 9 9 9 8 9 8 b b d d d d d f . . . . . . . . . . . 
. . . . . . . 8 8 9 9 8 b d d d d d d f . . . . . . . . . . . . 
. . . . . . . . . 8 8 f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . 8 f 2 2 1 1 f f f . . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 2 2 1 2 2 f . . . . . . . . . . . . . 
. . . . . . . . f 2 2 2 2 2 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . f 2 2 2 2 c 2 2 2 2 2 f f . . . . . . . . . . . . 
. . . . . . f 2 2 2 2 c 2 2 2 2 2 2 f c f . . . . . . . . . . . 
. . . . . . c d d 2 c 2 2 2 2 2 2 2 f c 2 f . . . . . . . . . . 
. . . . . . c b d c f 1 1 1 1 1 1 1 f c b f . . . . . . . . . . 
. . . . . . . c c . f 1 1 1 1 1 1 1 f b d f . . . . . . . . . . 
. . . . . . . . . . f f f f f f f f f f f . . . . . . . . . . . 
. . . . . . . . . . f 6 6 8 f 8 8 f . . . . . . . . . . . . . . 
. . . . . . . . . . f f f f f f f f . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f . f f . . . . . . . . . . . . . . . 
`)
    SlashRightJump.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . . . . . . . . . . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . . . . . . . . . . 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . . . . 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f f f f f f f f f 2 f . . . . . . . . . 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 9 8 c f . . . . . . . . . . 
. . . . . f 2 f f b 8 9 9 9 8 9 8 9 8 1 b . . . . . . . . . . . 
. . . . . . f 8 9 b 8 9 9 8 9 9 8 8 f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 9 9 8 9 8 b d f f b . . . . . . . . . . . 
. . . . . . 8 9 9 9 8 1 9 8 8 b d d d d b . . . . . . . . . . . 
. . . . . . . 8 9 9 9 8 9 8 b d d d d d f . . . . . . . . . . . 
. . . . . . . . 8 9 9 f 8 b d d d d d f . . . . . . . . . . . . 
. . . . . . . . . 8 8 . f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . 8 . . . . f f b f . . . . . . . . . . . . . . . 
. . . . . . . . . . f f f 1 1 f f f . . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 2 2 1 2 2 f . . . . . . . . . . . . . 
. . . . . . . . f 2 2 2 2 2 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . f 2 2 2 2 c 2 2 2 2 2 f f . . . . . . . . . . . . 
. . . . . . f 2 2 2 2 c 2 2 2 2 2 2 f c f . . . . . . . . . . . 
. . . . . . f d d 2 c 2 2 2 2 2 2 2 f c 2 f . . . . . . . . . . 
. . . . . . c b d c . 1 1 1 1 1 1 1 f c d f . . . . . . . . . . 
. . . . . . . c c . f 1 1 1 1 1 1 1 f c b f . . . . . . . . . . 
. . . . . . . . . . . f f f f f f f f f f . . . . . . . . . . . 
. . . . . . . . . . . f 6 6 8 f 8 8 f . . . . . . . . . . . . . 
. . . . . . . . . . . f 6 6 8 f f f f . . . . . . . . . . . . . 
. . . . . . . . . . . f f f f f f f . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f . . . . . . . . . . . . . . . . . . 
`)
    SlashRightJump.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . . . . . . . . . . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . . . . . . . . . . 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . . . . 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f f f f f f f f f 2 f . . . . . . . . . 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 8 c c f . . . . . . . . . . 
. . . . . f 2 f f b 8 9 9 9 9 9 8 9 8 1 b . . . . . . . . . . . 
. . . . . . f 8 9 b 8 9 9 9 9 9 8 8 f f b . . . . . . . . . . . 
. . . . . . . 8 9 8 9 9 9 8 9 8 b d f f b . . . . . . . . . . . 
. . . . . . 8 8 8 9 9 1 8 9 8 b d d d d b . . . . . . . . . . . 
. . . . . . . 8 9 8 8 8 8 8 b d d d d d f . . . . . . . . . . . 
. . . . . . . . 8 9 9 8 b d d d d d d f . . . . . . . . . . . . 
. . . . . . . . . 8 8 f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . 8 f f 2 2 1 1 f f f . . . . . . . . . . . . . . 
. . . . . . . . f 2 2 2 2 2 2 1 2 2 f . . . . . . . . . . . . . 
. . . . . . . f 2 2 2 2 2 2 2 2 2 2 f f . . . . . . . . . . . . 
. . . . . f f 2 2 2 2 2 2 2 2 2 2 2 f c f f . . . . . . . . . . 
. . . . f d d 2 2 2 2 c 2 2 2 2 2 2 f c 2 2 c c . . . . . . . . 
. . . . f b d 2 c c c 2 2 2 2 2 2 2 f c c 2 d d c . . . . . . . 
. . . . . c c c . . f 1 1 1 1 1 1 1 f f f 2 d b c . . . . . . . 
. . . . . . . . . . f 1 1 1 1 1 1 1 f . . f c c . . . . . . . . 
. . . . . . . . . . . f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . . . . f f 6 6 8 f . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f . . . . . . . . . . . . . . 
`)
    SlashRightJump.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . . . . . . . . . . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . . . . . . . . . . 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . . . . 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f f f f f f f f f 2 f . . . . . . . . . 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 8 c c f . . . . . . . . . . 
. . . . . f 2 f f b 8 9 9 9 9 9 8 9 8 1 b . . . . . . . . . . . 
. . . . . . f 8 9 b 8 9 9 9 9 9 8 8 f f b . . . . . . . . . . . 
. . . . . . . 8 9 8 9 9 9 8 9 8 b d f f b . . . . . . . . . . . 
. . . . . . . 8 8 9 9 1 8 9 8 b d d d d b . . . . . . . . . . . 
. . . . . . 8 9 9 8 8 8 8 8 b d d d d d f . . . . . . . . . . . 
. . . . . . . 8 8 9 9 8 f f f d d d d f . . . . . . . . . . . . 
. . . . . . . . . f f 2 2 1 1 f f f f . . . . . . . . . . . . . 
. . . . . c c f f 2 2 2 2 2 2 1 2 2 f f . . . . . . . . . . . . 
. . . . c d d 2 2 2 2 2 2 2 2 2 2 2 f c f f c c . . . . . . . . 
. . . . c b d 2 2 2 2 c 2 2 2 2 2 2 f c 2 2 d d c . . . . . . . 
. . . . . c c c c c c 2 2 2 2 2 2 2 f c c 2 d b c . . . . . . . 
. . . . . . . . . . f 2 2 2 2 2 2 2 f f f f c c . . . . . . . . 
. . . . . . . . . . f 1 1 1 1 1 1 1 f . . . . . . . . . . . . . 
. . . . . . . . . . . f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . . . f 8 8 f 6 6 8 f . . . . . . . . . . . . . 
. . . . . . . . . . . f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . . . . f f . . f f . . . . . . . . . . . . . . 
`)
    SlashRightJump.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . . . . . . . . . . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . . . . . . . . . . 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . . . . 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f f f f f f f f f 2 f . . . . . . . . . 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 9 8 c f . . . . . . . . . . 
. . . . . f 2 f f b 8 9 9 9 9 9 8 9 8 1 b . . . . . . . . . . . 
. . . . . . f 8 9 b 8 9 9 9 8 9 8 8 f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 9 9 8 9 8 b d f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 1 9 8 8 b d d d d b . . . . . . . . . . . 
. . . . . . 8 9 9 9 8 9 8 b b d d d d d f . . . . . . . . . . . 
. . . . . . . 8 8 9 9 8 b d d d d d d f . . . . . . . . . . . . 
. . . . . . . . . 8 8 f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . 8 f 2 2 1 1 f f f . . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 2 2 1 2 2 f . . . . . . . . . . . . . 
. . . . . . . . f 2 2 2 2 2 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . f 2 2 2 2 c 2 2 2 2 2 f f . . . . . . . . . . . . 
. . . . . . f 2 2 2 2 c 2 2 2 2 2 2 f c f . . . . . . . . . . . 
. . . . . . c d d 2 c 2 2 2 2 2 2 2 f c 2 f . . . . . . . . . . 
. . . . . . c b d c f 1 1 1 1 1 1 1 f c b f . . . . . . . . . . 
. . . . . . . c c . f 1 1 1 1 1 1 1 f b d f . . . . . . . . . . 
. . . . . . . . . . . f f f f f f f f f f . . . . . . . . . . . 
. . . . . . . . . . . . f f 6 6 8 f . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f f f f f . . . . . . . . . . . . . . 
`)
    SlashRightJump.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . . . . . . . . . . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . . . . . . . . . . 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . . . . 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f f f f f f f f f 2 f . . . . . . . . . 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 9 8 c f . . . . . . . . . . 
. . . . . f 2 f f b 8 9 9 9 8 9 8 9 8 1 b . . . . . . . . . . . 
. . . . . . f 8 9 b 8 9 9 8 9 9 8 8 f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 9 9 8 9 8 b d f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 1 9 8 8 b d d d d b . . . . . . . . . . . 
. . . . . . 8 9 9 9 9 8 9 8 b d d d d d f . . . . . . . . . . . 
. . . . . . . 8 8 9 9 f 8 b d d d d d f . . . . . . . . . . . . 
. . . . . . . . . 8 8 . f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . 8 . . . f f b f . . . . . . . . . . . . . . . 
. . . . . . . . . . . f f 1 1 f f f . . . . . . . . . . . . . . 
. . . . . . . . . . f 2 2 2 2 1 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 2 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 c 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 c 2 2 2 2 f f . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 c 2 2 2 2 f c f . . . . . . . . . . . 
. . . . . . . . . c d d c 1 1 1 1 1 f c f . . . . . . . . . . . 
. . . . . . . . . c d b c 1 1 1 1 1 f b f . . . . . . . . . . . 
. . . . . . . . . . c c f f f f f f f f . . . . . . . . . . . . 
. . . . . . . . . . . f 6 6 8 f 8 8 f . . . . . . . . . . . . . 
. . . . . . . . . . . f 6 6 8 f 8 8 f . . . . . . . . . . . . . 
. . . . . . . . . . . f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . . . . f f . . f f . . . . . . . . . . . . . . 
`)
    SlashRightJump.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . . . . . . . . . . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . . . . . . . . . . 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . . . . 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f f f f f f f f f 2 f . . . . . . . . . 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 9 8 c f . . . . . . . . . . 
. . . . . f 2 f f b 8 9 9 9 9 9 8 9 8 1 b . . . . . . . . . . . 
. . . . . . f 8 9 b 8 9 9 9 8 9 8 8 f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 9 9 8 9 8 b d f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 1 9 8 8 b d d d d b . . . . . . . . . . . 
. . . . . . 8 9 9 9 8 9 8 b b d d d d d f . . . . . . . . . . . 
. . . . . . . 8 8 9 9 8 b d d d d d d f . . . . . . . . . . . . 
. . . . . . . . . 8 8 f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . 8 f 2 2 1 1 f f f . . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 2 2 1 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 2 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 c 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 c 2 2 2 2 f f . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 c 2 2 2 2 f c f . . . . . . . . . . . 
. . . . . . . . . c d d c 1 1 1 1 1 f c f . . . . . . . . . . . 
. . . . . . . . . c d b c 1 1 1 1 1 f b f . . . . . . . . . . . 
. . . . . . . . . . c c f f f f f f f f . . . . . . . . . . . . 
. . . . . . . . . . . f 6 6 8 f 8 8 f . . . . . . . . . . . . . 
. . . . . . . . . . . f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . . . . f f . . f f . . . . . . . . . . . . . . 
`)
    SlashRightJumpAtk = animation.createAnimation(ActionKind.SlashRightJumpAtk, 120)
    animation.attachAnimation(HeroPlayer, SlashRightJumpAtk)
    SlashRightJumpAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . . . . . . . . . . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . . . . . . . . . . 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . . . . 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f f f f f f f f f 2 f . . . . . . . . . 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 9 8 c f . . . . . . . . . . 
. . . . . f 2 f f b 8 9 9 9 9 9 8 9 8 1 b . . . . . . . . . . . 
. . . . . . f 8 9 b 8 9 9 9 8 9 8 8 f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 9 9 8 9 8 b d f f b . . . . . . . . . . . 
. . . . . . . 8 9 9 8 1 9 8 8 b d d d d b . . . . . . . . . . . 
. . . . . . 8 9 9 9 8 9 8 b b d d d d d f . . . . . . . . . . . 
. . . . . . . 8 8 9 9 8 b d d d d d d f . . . . . . . . . . . . 
. . . . . . . . . 8 8 f f f f f f f f . . . . . . . . . . . . . 
. . . . . . . . . 8 f 2 2 1 1 f f f . . . . . . . . . . . . . . 
. . . . . . . . . f 2 2 2 2 2 1 2 2 f f . . . . . . . . . . . . 
. . . . . . . . f 2 2 2 c 2 2 2 2 2 f c c c . . . . . . . . . . 
. . . . . . . f 2 2 2 c 2 2 2 2 2 2 f c d d c . . . . . . . . . 
. . . . . . f 2 2 2 c 2 2 2 2 2 2 2 f f b d c . . . . . . . . . 
. . . . . . c d d c f 2 2 2 2 2 2 2 f . c c . . . . . . . . . . 
. . . . . . f f d c f 1 1 1 1 1 1 1 f . . . . . . . . . . . . . 
. . . . . f e f c . . f f f f f f f f . . . . . . . . . . . . . 
. . . . f 1 f . . . . f 8 8 f 6 6 8 f . . . . . . . . . . . . . 
. . . f 1 f . . . . . f 8 8 f f f f f . . . . . . . . . . . . . 
. . f 1 f . . . . . . f f f f . f f . . . . . . . . . . . . . . 
. . f f . . . . . . . . f f . . . . . . . . . . . . . . . . . . 
`)
    SlashRightJumpAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . . . . . . . . . . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . . . . . . . . . . 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . . . . 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 3 3 f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f f f f f f f f f 2 f . . . . . . . . . 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 8 c c f . . . . . . . . . . 
. . . . . f 2 f f b 8 9 9 9 9 9 8 9 8 1 b . . . . . . . . . . . 
. . . . . . f 8 9 b 8 9 9 9 9 9 8 8 f f b . . . . . . . . . . . 
. . . . . . . 8 9 8 9 9 9 8 9 8 b d f f b . . . . . . . . . . . 
. . . . . . 8 9 8 9 9 1 8 9 8 b d d d d b . . . . . . . . . . . 
. . . . . . . 8 9 8 8 8 8 8 b d d d d d f . . . . . . . . . . . 
. . . . . . . . 8 9 9 8 f f f d d d d f . . . . . . . . . . . . 
. . . . . . . . . f f 2 2 1 1 f f f f . . . . . . . . . . . . . 
. . . . . . . c f 2 2 2 2 2 2 1 2 2 f f . . . . . . . . . . . . 
. . . . . . c d 2 2 2 c 2 2 2 2 2 2 f c c . . . . . . . . . . . 
. . . . . f f d 2 c c 2 2 2 2 2 2 2 c d d c . . . . . . . . . . 
. . . . f e f c c . f 2 2 2 2 2 2 2 f b d c . . . . . . . . . . 
. . . f 1 f c . . . f 1 1 1 1 f f f f c c . . . . . . . . . . . 
. . f 1 f . . . . . . f f f f 6 6 8 f . . . . . . . . . . . . . 
. f 1 f . . . . . . . f 8 8 f f f f f . . . . . . . . . . . . . 
. f f . . . . . . . . f f f f . f f . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f . . . . . . . . . . . . . . . . . . 
`)
    SlashRightJumpAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . . . . . . . . . . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . . . . . . . . . . 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . . . . 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 3 f f . . . . . . . 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 3 f 1 f . . . . . . . 
. . . . . f 2 f 3 2 2 f f f f f f f f f f 2 f 1 f . . . . . . . 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 9 8 c f 1 f . . . . . . . . 
. . . . . f 2 f f b 8 9 9 9 9 9 8 9 8 1 f 1 f . . . . . . . . . 
. . . . . . f 8 9 b 8 9 9 9 8 9 8 8 c f e f . . . . . . . . . . 
. . . . . . . 8 9 9 8 9 9 8 9 8 b f d f f . . . . . . . . . . . 
. . . . . . 8 9 9 9 8 1 9 8 8 f f 2 d d c . . . . . . . . . . . 
. . . . . . . 8 9 9 8 9 8 f f 2 2 2 2 c . . . . . . . . . . . . 
. . . . . . . . 8 9 9 f f 2 2 2 2 2 c f . . . . . . . . . . . . 
. . . . . . . . . 8 f 2 2 2 2 2 2 c f c c . . . . . . . . . . . 
. . . . . . . . 8 . f 2 2 2 2 c c 2 c b d c . . . . . . . . . . 
. . . . . . . . . . f 2 2 c c 2 2 2 f d d c . . . . . . . . . . 
. . . . . . . . . . f 2 2 2 2 2 2 2 f c c . . . . . . . . . . . 
. . . . . . . . . . f 2 2 2 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . . f 2 2 2 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . . f 1 1 1 1 f f f f . . . . . . . . . . . . . 
. . . . . . . . . . . f f f f 6 6 8 f . . . . . . . . . . . . . 
. . . . . . . . . . . f 8 8 f f f f f . . . . . . . . . . . . . 
. . . . . . . . . . . f f f f . f f . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f . . . . . . . . . . . . . . . . . . 
`)
    SlashRightJumpAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . 1 1 1 1 1 1 1 1 1 1 . . . 
. . . . . . . . . . . . . . . . . . . . . 1 1 1 1 1 1 1 1 1 . . 
. . . . . . . . f f f f f f f f f f f f . . 1 1 1 1 1 1 1 1 1 . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . 1 1 1 1 1 1 1 1 . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . 1 1 1 1 1 1 1 1 1 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . 1 1 1 1 1 1 1 1 1 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f 1 1 1 1 1 1 1 1 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 f 1 f 1 1 1 1 1 1 1 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 f 1 f 1 1 1 1 1 1 1 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 f 1 f 1 1 1 1 1 1 1 1 
. . . . . f 2 f 3 2 2 f f f f f f f f f f f 1 f 1 1 1 1 1 1 1 1 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 9 8 f 1 f 1 1 1 1 1 1 1 1 1 
. . . . . f 2 f f b 8 9 9 9 9 9 8 9 c f b f 1 1 1 1 1 1 1 1 1 1 
. . . . . . f 8 9 b 8 9 9 9 9 9 8 f d f f . 1 1 1 1 1 1 1 1 1 1 
. . . . . . . 8 9 8 9 9 9 8 9 8 f 2 d d c . . 1 1 1 1 1 1 1 1 1 
. . . . . . . 8 8 9 9 1 8 9 8 f 2 2 2 c b . . 1 1 1 1 1 1 1 1 1 
. . . . . . 8 9 9 8 8 8 8 8 f 2 2 2 2 c f . . 1 1 1 1 1 1 1 1 1 
. . . . . . . 8 8 9 9 8 8 f 2 2 2 2 c f . . 1 1 1 1 1 1 1 1 1 1 
. . . . . . . . . 8 8 . f 2 2 2 2 2 c . 1 1 1 1 1 1 1 1 1 1 1 1 
. . . . . . . . . 8 . f 2 2 2 2 2 c f 1 1 1 1 1 1 1 1 1 1 1 1 1 
. . . . . . . . . . f 2 2 2 2 2 c 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
. . . . . . . . . . f 2 2 2 2 c 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
. . . . . . . . . . f 2 2 c c 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
. . . . . . . . . . f 2 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . 
. . . . . . . . . . f 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . 
. . . . . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . 
. . . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . 
. . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . . . 
. . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . . . . . 
. . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . . . . . . . 
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . . . . . . . . . 
. . . . 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . . . . . . . . . . . . 
`)
    SlashRightJumpAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . . . . . . . . . . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . . . . . . . . . . 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . . . . 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f 1 1 . . . . . . 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 3 3 f 1 1 . . . . . 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 3 f f 1 1 1 . . . . 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 3 f 1 f 1 1 1 . . . . 
. . . . . f 2 f 3 2 2 f f f f f f f f f f 2 f 1 f 1 1 1 1 . . . 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 9 8 c f 1 f 1 1 1 1 1 . . . 
. . . . . f 2 f f b 8 9 9 9 9 9 8 9 8 1 f 1 f 1 1 1 1 1 1 . . . 
. . . . . . f 8 9 b 8 9 9 9 8 9 8 8 c f e f 1 1 1 1 1 1 1 . . . 
. . . . . . . 8 9 9 8 9 9 8 9 8 b f d f f . 1 1 1 1 1 1 1 . . . 
. . . . . . 8 9 9 9 8 1 9 8 8 f f 2 d d c 1 1 1 1 1 1 1 1 . . . 
. . . . . . . 8 9 9 8 9 8 f f 2 2 2 2 c . 1 1 1 1 1 1 1 1 . . . 
. . . . . . . . 8 9 8 f f 2 2 2 2 2 c f . 1 1 1 1 1 1 1 . . . . 
. . . . . . . . . 8 f 2 2 2 2 2 2 c f c c 1 1 1 1 1 1 1 . . . . 
. . . . . . . . 8 . f 2 2 2 2 c c 2 c b 1 1 1 1 1 1 1 . . . . . 
. . . . . . . . . . f 2 2 c c 2 2 2 f d 1 1 1 1 1 1 . . . . . . 
. . . . . . . . . . f 2 2 2 2 2 2 2 f c 1 1 1 1 1 1 . . . . . . 
. . . . . . . . . . f 2 2 2 2 2 2 2 f 1 1 1 1 1 1 . . . . . . . 
. . . . . . . . . . f 1 1 1 1 1 1 1 f 1 1 1 1 . . . . . . . . . 
. . . . . . . . . . . f f f f f f f 1 1 . . . . . . . . . . . . 
. . . . . . . . . . . f 8 8 f 6 6 8 f . . . . . . . . . . . . . 
. . . . . . . . . . . f 8 8 f f f f f . . . . . . . . . . . . . 
. . . . . . . . . . . f f f f . f f . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f . . . . . . . . . . . . . . . . . . 
`)
    SlashRightJumpAtk.addAnimationFrame(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . f f f f f f f f f f f f . . . . . . . . . . . . 
. . . . . . . f 2 2 f f 3 3 3 3 1 1 1 1 f . . . . . . . . . . . 
. . . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 1 f . . . . . . . . . . 
. . . . . f 2 2 f 3 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . . . . 
. . . . . f 2 f 3 3 3 3 3 f f f f f f f f f f f . . . . . . . . 
. . . . . f 2 f 3 2 2 f f 3 3 3 3 3 3 3 3 3 3 3 f . . . . . . . 
. . . . . f 2 f 2 f f 3 3 3 3 3 3 3 3 3 3 3 3 f f . . . . . . . 
. . . . . f 2 2 f 3 3 2 2 2 2 2 2 2 2 2 2 3 f 1 f . . . . . . . 
. . . . . f 2 f 3 2 2 f f f f f f f f f f 2 f 1 f . . . . . . . 
. . . . . f 2 f 2 f f 8 9 9 9 9 9 8 9 8 c f 1 f . . . . . . . . 
. . . . . f 2 f f b 8 9 9 9 8 9 8 9 8 1 f 1 f . . . . . . . . . 
. . . . . . f 8 9 b 8 9 9 8 9 9 8 8 c f e f . . . . . . . . . . 
. . . . . . . 8 9 9 8 9 9 8 9 8 b f d f f . . . . . . . . . . . 
. . . . . . 8 8 9 9 8 1 9 8 8 f f 2 d d c . . . . . . . . . . . 
. . . . . . . 8 9 9 9 8 9 f f 2 2 2 2 c . . . . . . . . . . . . 
. . . . . . . . 8 9 9 f f 2 2 2 2 2 c f . . . . . . . . . . . . 
. . . . . . . . . 8 f 2 2 2 2 2 2 c f c c . . . . . . . . . . . 
. . . . . . . . 8 . f 2 2 2 2 c c 2 c b d c . . . . . . . . . . 
. . . . . . . . . . f 2 2 c c 2 2 2 f d d c . . . . . . . . . . 
. . . . . . . . . . f 2 2 2 2 2 2 2 f c c . . . . . . . . . . . 
. . . . . . . . . . f 2 2 2 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . . f 2 2 2 2 2 2 2 f . . . . . . . . . . . . . 
. . . . . . . . . . f 1 1 1 1 f f f f . . . . . . . . . . . . . 
. . . . . . . . . . . f f f f 6 6 8 f . . . . . . . . . . . . . 
. . . . . . . . . . . f 8 8 f f f f f . . . . . . . . . . . . . 
. . . . . . . . . . . f f f f . f f . . . . . . . . . . . . . . 
. . . . . . . . . . . . f f . . . . . . . . . . . . . . . . . . 
`)
}
// Changes the border of the text box
function ChatBox () {
    game.setDialogFrame(img`
f f f f f f f f f f f f f f f 
f 9 9 9 9 9 9 9 9 9 9 9 9 9 f 
f 9 f f f f f f f f f f f 9 f 
f 9 f 8 8 8 8 8 8 8 8 8 f 9 f 
f 9 f 8 f f f f f f f 8 f 9 f 
f 9 f 8 f f f f f f f 8 f 9 f 
f 9 f 8 f f f f f f f 8 f 9 f 
f 9 f 8 f f f f f f f 8 f 9 f 
f 9 f 8 f f f f f f f 8 f 9 f 
f 9 f 8 f f f f f f f 8 f 9 f 
f 9 f 8 f f f f f f f 8 f 9 f 
f 9 f 8 8 8 8 8 8 8 8 8 f 9 f 
f 9 f f f f f f f f f f f 9 f 
f 9 9 9 9 9 9 9 9 9 9 9 9 9 f 
f f f f f f f f f f f f f f f 
`)
    game.setDialogCursor(img`
. . . . . . . . 
. . . . 9 . . . 
. . . 9 8 9 . . 
. . 9 8 8 8 9 . 
. 9 8 8 8 8 8 9 
. . 9 8 8 8 9 . 
. . . 9 8 9 . . 
. . . . 9 . . . 
`)
    game.setDialogTextColor(9)
}
// Removes all sprites from a level
function RemovalofSprites () {
    for (let value2 of sprites.allOfKind(SpriteKind.Environment)) {
        value2.destroy()
    }
    for (let value225 of sprites.allOfKind(SpriteKind.Damage)) {
        value225.destroy()
    }
    for (let value22 of sprites.allOfKind(SpriteKind.InteractivesTutorial)) {
        value22.destroy()
    }
    for (let value2252 of sprites.allOfKind(SpriteKind.InteractiveFBLA)) {
        value2252.destroy()
    }
    for (let value2253 of sprites.allOfKind(SpriteKind.InteractiveStory)) {
        value2253.destroy()
    }
    for (let value2254 of sprites.allOfKind(SpriteKind.ToLevel)) {
        value2254.destroy()
    }
    for (let value22542 of sprites.allOfKind(SpriteKind.Monster)) {
        value22542.destroy()
    }
    for (let value225422 of sprites.allOfKind(SpriteKind.Points)) {
        value225422.destroy()
    }
}
let SlashRightJumpAtk: animation.Animation = null
let SlashRightJump: animation.Animation = null
let SlashRightIdleAtk: animation.Animation = null
let SlashRightWalkAtk: animation.Animation = null
let SlashRightIdle: animation.Animation = null
let SlashRightWalk: animation.Animation = null
let SlashRightClimb: animation.Animation = null
let SoulLeftJumpAtk: animation.Animation = null
let SoulLeftJump: animation.Animation = null
let SoulLeftIdleAtk: animation.Animation = null
let SoulLeftWalkAtk: animation.Animation = null
let SoulLeftIdle: animation.Animation = null
let SoulLeftWalk: animation.Animation = null
let SlashLeftClimb: animation.Animation = null
let SlashLeftJumpAtk: animation.Animation = null
let SlashLeftJump: animation.Animation = null
let SlashLeftIdleAtk: animation.Animation = null
let SlashLeftWalkingAtk: animation.Animation = null
let SlashLeftIdle: animation.Animation = null
let SlashLeftWalk: animation.Animation = null
let DoubleJump = false
let ClimbRightWall = false
let ClimbLeftWall = false
let MonsterPlace: Sprite = null
let MonsterChoose = 0
let MonsterSet: Image[] = []
let SoulRightJumpAtk: animation.Animation = null
let SoulRightJump: animation.Animation = null
let SoulRightIdleAtk: animation.Animation = null
let SoulRightWalkAtk: animation.Animation = null
let SoulRightIdle: animation.Animation = null
let SoulRightWalk: animation.Animation = null
let PointsGain: Sprite = null
let Gate: Sprite = null
let Lava: Sprite = null
let EnvironmentPlace: Sprite = null
let EnvironmentChoose = 0
let SlashActiveAtk = false
let SoulAttack: Sprite = null
let Music = false
let Levels: Image[] = []
let Environment2: Image[] = []
let SlashActive = false
let TilesFBLA: Sprite = null
let TileStory: Sprite = null
let TileTutorial: Sprite = null
let NextLevel = 0
let LookDown = false
let LookUp = false
let LookLeft = false
let LookRight = false
let SoulActiveAtk = false
let SoulActive = false
let HeroPlayer: Sprite = null
let Move = false
Introduction()
hero()
BuildMap()
LevelNext()
// Wall Climb
game.onUpdate(function () {
    if (SlashActive == true) {
        if (HeroPlayer.isHittingTile(CollisionDirection.Left) && HeroPlayer.vy >= 0) {
            if (ClimbLeftWall == true && HeroPlayer.isHittingTile(CollisionDirection.Left)) {
                HeroPlayer.ay = 120
            } else if (ClimbRightWall == true && HeroPlayer.isHittingTile(CollisionDirection.Right)) {
                HeroPlayer.ay = 120
            } else {
                HeroPlayer.vy = 0
                HeroPlayer.ay = 0
                ClimbLeftWall = false
            }
        } else if (HeroPlayer.isHittingTile(CollisionDirection.Right) && HeroPlayer.vy >= 0) {
            if (ClimbLeftWall == true && HeroPlayer.isHittingTile(CollisionDirection.Left)) {
                HeroPlayer.ay = 120
            } else if (ClimbRightWall == true && HeroPlayer.isHittingTile(CollisionDirection.Right)) {
                HeroPlayer.ay = 120
            } else {
                HeroPlayer.vy = 0
                HeroPlayer.ay = 0
                ClimbRightWall = false
            }
        } else if (HeroPlayer.isHittingTile(CollisionDirection.Bottom)) {
            ClimbLeftWall = false
            ClimbRightWall = false
        } else {
            HeroPlayer.ay = 120
        }
    } else if (SoulActive == true) {
        HeroPlayer.ay = 120
    }
})
game.onUpdate(function () {
    SlashAnimation()
    SoulAnimation()
})
// Resets the current level if the player HP reaches 0
game.onUpdate(function () {
    if (info.player2.score() == 0) {
        info.changeLifeBy(-1)
        for (let value3 of scene.getTilesByType(15)) {
            value3.place(HeroPlayer)
        }
        info.player2.setScore(100)
    } else if (info.life() == 0 && info.player2.score() == 0) {
        game.over(false)
    }
})
// The Music
forever(function () {
    if (Music == true) {
        music.setVolume(25)
        music.playMelody("E G B C5 B G A D ", 120)
        music.playMelody("E C E G B C5 B E ", 120)
        music.playMelody("G D E C D E F G ", 120)
    }
})
