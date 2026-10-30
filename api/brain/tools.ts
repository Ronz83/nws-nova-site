import { provisionWorkspace, provisionAIAgent } from '../connect/provisionService';
import { bos } from '../lib/bos';

// Helper to match Gemini's required tool schema format
export const portalTools = [
  {
    name: 'list_active_clients',
    description: 'Returns a list of all active client locations/workspaces in the database.',
    parameters: {
      type: 'OBJECT',
      properties: {},
      required: []
    }
  },
  {
    name: 'create_fulfillment_task',
    description: 'Creates a new task on the fulfillment Kanban board.',
    parameters: {
      type: 'OBJECT',
      properties: {
        title: { type: 'STRING', description: 'The title of the task (e.g. Setup AI Agent)' },
        clientName: { type: 'STRING', description: 'The name of the client this task is for' },
        priority: { type: 'STRING', description: 'High, Medium, or Low' },
      },
      required: ['title', 'clientName', 'priority']
    }
  },
  {
    name: 'update_task_status',
    description: 'Moves a fulfillment task to a different column on the Kanban board.',
    parameters: {
      type: 'OBJECT',
      properties: {
        taskId: { type: 'STRING', description: 'The UUID of the task to update' },
        newColumn: { type: 'STRING', description: 'The column to move it to: Backlog, In Progress, In Review, or Completed' }
      },
      required: ['taskId', 'newColumn']
    }
  },
  {
    name: 'create_ai_agent',
    description: 'Creates a new Voice AI Agent in the specified GoHighLevel location.',
    parameters: {
      type: 'OBJECT',
      properties: {
        locationId: { type: 'STRING', description: 'The UUID of the location/sub-account' },
        agentName: { type: 'STRING', description: 'The name of the AI agent' },
        prompt: { type: 'STRING', description: 'The system prompt or instructions for the AI agent' }
      },
      required: ['locationId', 'agentName']
    }
  }
];

export async function executeTool(name: string, args: any) {
  console.log(`[Brain] Executing Tool: ${name}`, args);
  
  try {
    switch (name) {
      case 'list_active_clients': {
        const { clients: data } = await bos.clients.list(20);
        return { success: true, clients: data };
      }

      case 'create_fulfillment_task': {
        const { title, clientName, priority } = args;
        const data = await bos.fulfillmentTasks.create({ title, client_name: clientName, priority, column: 'Backlog' });
        return { success: true, task: data };
      }

      case 'update_task_status': {
        const { taskId, newColumn } = args;
        const data = await bos.fulfillmentTasks.update(taskId, { column: newColumn });
        if (!data) throw new Error('Task not found');
        return { success: true, task: data };
      }

      case 'create_ai_agent': {
        const { locationId, agentName, prompt } = args;
        
        // Pass prompt as part of the agentConfig if provided
        const agentConfig: any = { agentName };
        if (prompt) {
          agentConfig.prompt = prompt;
        }

        const result = await provisionAIAgent(locationId, agentConfig);
        return result;
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (err: any) {
    console.error(`[Brain] Tool ${name} failed:`, err.message);
    return { success: false, error: err.message };
  }
}
