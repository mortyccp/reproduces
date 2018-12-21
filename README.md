Repository contains bug report reproduce setup

# Steps to reproduce
1. CD: `cd app`
1. `yarn`
1. Check options: `npx @vue/cli inspect --plugin fork-ts-checker`
1. Run: `yarn run build`
1. Observe: `git diff` and see `App.vue` is broken and `HelloWorld.vue` template and style section got auto-fixed.
