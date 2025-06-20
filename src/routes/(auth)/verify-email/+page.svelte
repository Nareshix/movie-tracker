<script lang="ts">
 import * as Card from "$lib/components/ui/card/index.js";
 import { Mail } from "@lucide/svelte";
 
</script>

<div class="grid place-items-center h-svh">
<Card.Root class="w-full max-w-sm text-center">
 <Card.Header>

    <div class="grid place-items-center">
    <Mail class="mb-4"/>

  <Card.Title class="mb-1">An email has been sent to you  </Card.Title>
  <Card.Description
   >Please open it and verify your email!</Card.Description
  >        
    </div>
  </Card.Header>
 <Card.Footer>
    <div class="grid place-items-center">
    If you did not recieve the email in a few minutes, plrease retry the process again
    </div>
 </Card.Footer>
</Card.Root>
</div>